export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  radiologist_id: string;
}

export interface FormData {
  name: string;
  age: string;
  gender: string;
}
