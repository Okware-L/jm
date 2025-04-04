"use client"

import { useState } from 'react';
import { db } from '../../firebseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export default function AcquisitionsForm() {
  const [acquisitionData, setAcquisitionData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    acquisitionType: '',
    description: '',
    industry: '',
    estimatedValue: '',
    financialStatements: '',
    debtsLiabilities: '',
    preliminaryDueDiligence: '',
    shareConfidentialInfo: '',
    dueDiligenceRequirements: '',
    legalDisputes: '',
    compliance: '',
    licensesPermits: '',
    operationsManagement: '',
    keyEmployees: '',
    customerBase: '',
    timeline: '',
    financingDetails: '',
    sellerFinancing: '',
    additionalInfo: '',
  });

  const [document, setDocument] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAcquisitionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const col = collection(db, 'acquisitionsData');

    try {
      let fileUrl = '';
      if (document) {
        const storage = getStorage();
        const fileRef = ref(storage, `valuationDocuments/${document.name}-${Date.now()}`);
        await uploadBytes(fileRef, document);
        fileUrl = await getDownloadURL(fileRef);
      }

      await addDoc(col, {
        ...acquisitionData,
        documentUrl: fileUrl,
      });

      toast('Data submitted successfully', {
        
        duration: 5000,
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      toast('Failed to submit data', {
        
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="sm:w-3/4 p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-light text-center mb-6 text-black">
          Acquisitions & Valuation Questionnaire
        </h2>
        <form onSubmit={handleSubmit}>
          <Input name="name" placeholder="Full Name" value={acquisitionData.name} onChange={handleChange} className="mb-4" />
          <Input name="companyName" placeholder="Company Name" value={acquisitionData.companyName} onChange={handleChange} className="mb-4" />
          <Input name="email" placeholder="Email Address" value={acquisitionData.email} onChange={handleChange} className="mb-4" />
          <Input name="phone" placeholder="Phone Number" value={acquisitionData.phone} onChange={handleChange} className="mb-4" />
          <Input name="address" placeholder="Address" value={acquisitionData.address} onChange={handleChange} className="mb-4" />
          <Input name="acquisitionType" placeholder="Acquisition or Valuation Type" value={acquisitionData.acquisitionType} onChange={handleChange} className="mb-4" />
          <Textarea name="description" placeholder="Business Description" value={acquisitionData.description} onChange={handleChange} className="mb-4" />
          <Input name="industry" placeholder="Industry" value={acquisitionData.industry} onChange={handleChange} className="mb-4" />
          <Input name="estimatedValue" placeholder="Estimated Business Value" value={acquisitionData.estimatedValue} onChange={handleChange} className="mb-4" />
          <Textarea name="financialStatements" placeholder="Summary of Financial Statements" value={acquisitionData.financialStatements} onChange={handleChange} className="mb-4" />
          <Textarea name="debtsLiabilities" placeholder="Existing Debts or Liabilities" value={acquisitionData.debtsLiabilities} onChange={handleChange} className="mb-4" />
          <Textarea name="preliminaryDueDiligence" placeholder="Preliminary Due Diligence Completed?" value={acquisitionData.preliminaryDueDiligence} onChange={handleChange} className="mb-4" />
          <Textarea name="shareConfidentialInfo" placeholder="Willing to Share Confidential Info?" value={acquisitionData.shareConfidentialInfo} onChange={handleChange} className="mb-4" />
          <Textarea name="dueDiligenceRequirements" placeholder="Due Diligence Requirements" value={acquisitionData.dueDiligenceRequirements} onChange={handleChange} className="mb-4" />
          <Textarea name="legalDisputes" placeholder="Pending Legal Disputes?" value={acquisitionData.legalDisputes} onChange={handleChange} className="mb-4" />
          <Textarea name="compliance" placeholder="Regulatory or Tax Compliance Status" value={acquisitionData.compliance} onChange={handleChange} className="mb-4" />
          <Textarea name="licensesPermits" placeholder="Key Licenses or Permits" value={acquisitionData.licensesPermits} onChange={handleChange} className="mb-4" />
          <Textarea name="operationsManagement" placeholder="Operations & Management Summary" value={acquisitionData.operationsManagement} onChange={handleChange} className="mb-4" />
          <Textarea name="keyEmployees" placeholder="Key Employees / Management" value={acquisitionData.keyEmployees} onChange={handleChange} className="mb-4" />
          <Textarea name="customerBase" placeholder="Customer Base & Revenue Streams" value={acquisitionData.customerBase} onChange={handleChange} className="mb-4" />
          <Input name="timeline" placeholder="Preferred Acquisition Timeline" value={acquisitionData.timeline} onChange={handleChange} className="mb-4" />
          <Textarea name="financingDetails" placeholder="Financing Details or Requirements" value={acquisitionData.financingDetails} onChange={handleChange} className="mb-4" />
          <Textarea name="sellerFinancing" placeholder="Seller Financing Willingness" value={acquisitionData.sellerFinancing} onChange={handleChange} className="mb-4" />
          <Textarea name="additionalInfo" placeholder="Additional Information" value={acquisitionData.additionalInfo} onChange={handleChange} className="mb-4" />

          <div className="mb-4">
            <label htmlFor="document" className="block text-sm font-medium">
              Upload Supporting Documents
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xlsx,.jpg,.png"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setDocument(e.target.files[0]);
                }
              }}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Submit Acquisitions / Valuation Data
          </button>
        </form>
      </div>
    </div>
  );
}
