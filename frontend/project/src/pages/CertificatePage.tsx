import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import {
  Download,
  Share2,
  Award,
  Calendar,
  Clock,
  User,
  BookOpen,
  CheckCircle,
  Shield,
  Globe,
} from 'lucide-react';
import { Certificate } from '../types/Certificate';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

// TODO: في Django، سيتم استخدام:
// 1. Django Class-Based Views بدلاً من Certificate Page
// 2. Django Templates بدلاً من Certificate UI
// 3. Django ORM بدلاً من Certificate Data
// 4. Django Media Files بدلاً من Certificate PDF
// 5. Django Permissions بدلاً من Certificate Access

const CertificatePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const certificateRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Mock certificate data (replace with actual API call)
  const certificate: Certificate = {
    id: '1',
    userId: user?.id || '',
    courseId: courseId || '',
    courseName: 'Advanced Web Development',
    studentName: user?.name || 'John Doe',
    issueDate: new Date(),
    certificateNumber: 'CERT-2024-001',
    grade: 'A',
    completionDate: new Date(),
    instructorName: 'Dr. Sarah Wilson',
    instructorTitle: 'Lead Web Development Instructor',
    courseHours: 40,
    skills: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Web Security', 'Performance Optimization'],
  };

  // Generate QR Code
  React.useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = window.location.href;
        const qrCode = await QRCode.toDataURL(url);
        setQrCodeUrl(qrCode);
        setShareUrl(url);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      }
    };

    generateQRCode();
  }, []);

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgWidth = 297; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${certificate.studentName}-${certificate.courseName}-Certificate.pdf`);
      
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download certificate');
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mb-8">
          <button
            onClick={downloadPDF}
            disabled={isGeneratingPDF}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow-lg transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Download Certificate'}
          </button>
          <div className="flex items-center space-x-2">
            <FacebookShareButton 
              url={shareUrl} 
              hashtag={`#${certificate.courseName.replace(/\s+/g, '')}`}
            >
              <FacebookIcon size={36} round className="hover:scale-110 transition-transform" />
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl} title={`Certificate of Completion - ${certificate.courseName}`}>
              <LinkedinIcon size={36} round className="hover:scale-110 transition-transform" />
            </LinkedinShareButton>
            <TwitterShareButton url={shareUrl} title={`I just completed ${certificate.courseName}!`}>
              <TwitterIcon size={36} round className="hover:scale-110 transition-transform" />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl} title={`Check out my certificate for ${certificate.courseName}!`}>
              <WhatsappIcon size={36} round className="hover:scale-110 transition-transform" />
            </WhatsappShareButton>
          </div>
        </div>

        {/* Certificate */}
        <div
          ref={certificateRef}
          className="bg-white rounded-xl shadow-2xl p-12 max-w-4xl mx-auto"
          style={{
            backgroundImage: 'url(/certificate-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-center relative">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 opacity-20 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 opacity-20 rounded-full translate-x-16 translate-y-16"></div>
            
            <div className="mb-12">
              <img
                src="/logo.png"
                alt="Organization Logo"
                className="h-20 mx-auto mb-6"
              />
              <h1 className="text-5xl font-serif text-gray-800 mb-3">Certificate of Achievement</h1>
              <div className="w-40 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto"></div>
            </div>

            <div className="mb-12">
              <p className="text-2xl text-gray-600 mb-4">This is to certify that</p>
              <h2 className="text-4xl font-bold text-blue-600 mb-4 font-serif">{certificate.studentName}</h2>
              <p className="text-xl text-gray-600">
                has successfully completed the course
              </p>
              <h3 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                {certificate.courseName}
              </h3>
              <p className="text-lg text-gray-600">with distinction</p>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-12 text-left max-w-2xl mx-auto">
              <div>
                <div className="flex items-center mb-6">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Completion Date</p>
                    <p className="font-semibold text-lg">
                      {certificate.completionDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <Clock className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Course Duration</p>
                    <p className="font-semibold text-lg">{certificate.courseHours} Hours</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <Award className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Final Grade</p>
                    <p className="font-semibold text-lg">{certificate.grade}</p>
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Certificate ID</p>
                    <p className="font-semibold text-lg">{certificate.certificateNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Skills & Competencies</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-12">
              <div className="text-center">
                <div className="mb-3">
                  <img
                    src="/signature.png"
                    alt="Instructor Signature"
                    className="h-16 mx-auto"
                  />
                </div>
                <p className="font-semibold text-lg">{certificate.instructorName}</p>
                <p className="text-gray-600">{certificate.instructorTitle}</p>
              </div>
              <div className="text-center">
                <div className="mb-3">
                  <img
                    src={qrCodeUrl}
                    alt="Certificate QR Code"
                    className="h-28 mx-auto"
                  />
                </div>
                <p className="text-gray-600">Scan to verify authenticity</p>
              </div>
            </div>

            <div className="text-gray-500 flex items-center justify-center">
              <Globe className="w-4 h-4 mr-2" />
              <span>Issued on {certificate.issueDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">About This Certificate</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            This certificate validates the successful completion of the {certificate.courseName} course.
            The recipient has demonstrated proficiency in modern web development technologies and best practices,
            meeting all course requirements with excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <BookOpen className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Course Overview</h3>
                <p className="text-gray-600 leading-relaxed">
                  A comprehensive curriculum covering both theoretical foundations and practical
                  implementation of modern web development technologies.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <User className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Course Instructor</h3>
                <p className="text-gray-600 leading-relaxed">
                  {certificate.instructorName} - {certificate.instructorTitle}
                  <br />
                  <span className="text-sm">Industry expert with over 10 years of experience</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage; 