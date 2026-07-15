export interface TrainingRecord {
  projectName: string;
  empId: string;
  employeeName: string;
  course: string;
  trainerName: string;
  trainingType: string;
  startDate: string;
  endDate: string;
  status: string;
  percentCompleted: string;
}

export interface EnvConfig {
  BASE_URL: string;
}
