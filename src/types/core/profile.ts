export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  countryId: number | null;
  postcode: string;

  cityId: number | null;
  universityId: number | null;
  degreeLevelId: number | null;
  courseName: string;

  hasArrived: boolean | null;
  arrivalDate: string | null;
  accommodationTypeId: number | null;
}

export interface GetProfileResponse {
  isProfileCompleted: boolean;
  profile: UserProfile
}
export interface UpdateArrivalDateRequest {
  arrivalDate: string;
  hasArrived: boolean;
}
export interface ProfileLookups {
  countries: Country[];
  cities: City[];
  universities: University[];
}

export interface Country {
  countryId: number;
  name: string;
  code: string;
  flagEmoji: string;
}

export interface City {
  cityId: number;
  countryId: number;
  name: string;
}

export interface University {
  universityId: number;
  cityId: number;
  name: string;
}