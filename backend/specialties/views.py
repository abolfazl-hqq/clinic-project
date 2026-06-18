from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Specialty, DoctorProfile
from .serializers import SpecialtySerializer, DoctorProfileSerializer


class SpecialtyListView(generics.ListAPIView):
    queryset = Specialty.objects.all()
    serializer_class = SpecialtySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class DoctorListView(generics.ListAPIView):
    serializer_class = DoctorProfileSerializer
    permission_classes = [permissions.AllowAny]

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    filterset_fields = {
        'specialty__id': ['exact'],
        'specialty__name': ['icontains'],
        'gender': ['exact'],
        'visit_type': ['exact'],
        'city': ['icontains'],
        'consultation_fee': ['lte', 'gte'],
        'experience_years': ['gte', 'lte'],
        'clinic__id': ['exact'],
        'clinic__city': ['icontains'],
    }

    search_fields = [
        'user__first_name',
        'user__last_name',
        'specialty__name',
        'city',
        'clinic__name',
        'clinic__city',
        'bio',
    ]

    ordering_fields = ['consultation_fee', 'experience_years', 'user__first_name']
    ordering = ['user__first_name']

    def get_queryset(self):
        base_qs = DoctorProfile.objects.filter(
            is_verified=True
        ).select_related(
            'user',
            'specialty',
            'clinic',
        )

        user = self.request.user
        if user.is_authenticated and user.is_staff:
            return DoctorProfile.objects.select_related('user', 'specialty', 'clinic')

        if user.is_authenticated and getattr(user, 'role', None) == 'doctor':
            own_qs = DoctorProfile.objects.filter(
                user=user
            ).select_related('user', 'specialty', 'clinic')
            return (base_qs | own_qs).distinct()

        return base_qs
