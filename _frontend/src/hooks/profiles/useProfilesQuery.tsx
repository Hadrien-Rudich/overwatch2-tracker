import { useQuery } from '@tanstack/react-query';
import { authStore } from '../../store/authStore';
import { profileStore } from '../../store/profileStore';
import { fetchProfilesFromApi } from '../../services/API/profiles';
import type { ProfileData } from '../../types/store/profileTypes';

function useProfilesQuery() {
  const { userData } = authStore();
  const { addProfilesData } = profileStore();

  const { isLoading, isFetching, isError, isSuccess } = useQuery({
    queryKey: [`profilesData', userId:${userData.id}`],
    queryFn: () => fetchProfilesFromApi(userData.id),
    onSuccess: (fetchedData: ProfileData[]) => {
      addProfilesData(fetchedData);
    },
    retry: 1,
  });

  return { isLoading, isFetching, isError, isSuccess };
}

export default useProfilesQuery;
