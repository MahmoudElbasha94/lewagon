export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  studentName: string;
  issueDate: Date;
  certificateNumber: string;
  grade: string;
  completionDate: Date;
  instructorName: string;
  instructorTitle: string;
  courseHours: number;
  skills: string[];
  qrCode?: string;
  pdfUrl?: string;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  background: string;
  font: string;
  color: string;
  orientation: 'landscape' | 'portrait';
} 