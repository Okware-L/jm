"use client"

import { useState } from 'react';
import { db } from '../firebseConfig';
import { collection, addDoc } from 'firebase/firestore';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcquisitionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const col = collection(db, 'acquisitionsData');
    
    try {
      await addDoc(col, acquisitionData);
      toast('Acquisitions data submitted successfully', {
        variant: 'success',
        duration: 5000,
      });
      
    } catch (error) {
      console.error('Error submitting acquisitions data:', error);
      toast('Failed to submit acquisitions data', {
        variant: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="sm:w-3/4 p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-light text-center mb-6 text-black">
          Acquisitions Questionnaire
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input
              name="name"
              value={acquisitionData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border-gray-300 rounded-md"
            />
          </div>
<div className="mb-4">
  <label htmlFor="name" className="block text-sm font-medium">
    Name
  </label>
  <Input
    name="name"
    value={acquisitionData.name}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="companyName" className="block text-sm font-medium">
    Company Name (if applicable)
  </label>
  <Input
    name="companyName"
    value={acquisitionData.companyName}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="email" className="block text-sm font-medium">
    Email
  </label>
  <Input
    name="email"
    value={acquisitionData.email}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="phone" className="block text-sm font-medium">
    Phone Number
  </label>
  <Input
    name="phone"
    value={acquisitionData.phone}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="address" className="block text-sm font-medium">
    Address
  </label>
  <Input
    name="address"
    value={acquisitionData.address}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="acquisitionType" className="block text-sm font-medium">
    Acquisition Type
  </label>
  <Input
  placeholder='Acquire / Get Acquired'
    name="acquisitionType"
    value={acquisitionData.acquisitionType}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="description" className="block text-sm font-medium">
    Description (if selling)
  </label>
  <Input
    name="description"
    value={acquisitionData.description}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>
<div className="mb-4">
  <label htmlFor="estimatedValue" className="block text-sm font-medium">
    Estimated Value
  </label>
  <Input
    name="estimatedValue"
    value={acquisitionData.estimatedValue}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="financialStatements" className="block text-sm font-medium">
    Financial Statements
  </label>
  <Input
    name="financialStatements"
    value={acquisitionData.financialStatements}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="debtsLiabilities" className="block text-sm font-medium">
    Debts and Liabilities
  </label>
  <Input
    name="debtsLiabilities"
    value={acquisitionData.debtsLiabilities}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="preliminaryDueDiligence" className="block text-sm font-medium">
    Preliminary Due Diligence
  </label>
  <Input
    name="preliminaryDueDiligence"
    value={acquisitionData.preliminaryDueDiligence}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="shareConfidentialInfo" className="block text-sm font-medium">
    Share Confidential Information
  </label>
  <Input
    name="shareConfidentialInfo"
    value={acquisitionData.shareConfidentialInfo}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="dueDiligenceRequirements" className="block text-sm font-medium">
    Due Diligence Requirements
  </label>
  <Input
    name="dueDiligenceRequirements"
    value={acquisitionData.dueDiligenceRequirements}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>
<div className="mb-4">
  <label htmlFor="legalDisputes" className="block text-sm font-medium">
    Legal Disputes
  </label>
  <Textarea
    name="legalDisputes"
    value={acquisitionData.legalDisputes}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="compliance" className="block text-sm font-medium">
    Compliance
  </label>
  <Textarea
    name="compliance"
    value={acquisitionData.compliance}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="licensesPermits" className="block text-sm font-medium">
    Licenses and Permits
  </label>
  <Textarea
    name="licensesPermits"
    value={acquisitionData.licensesPermits}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="operationsManagement" className="block text-sm font-medium">
    Operations Management
  </label>
  <Textarea
    name="operationsManagement"
    value={acquisitionData.operationsManagement}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="keyEmployees" className="block text-sm font-medium">
    Key Employees
  </label>
  <Textarea
    name="keyEmployees"
    value={acquisitionData.keyEmployees}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="customerBase" className="block text-sm font-medium">
    Customer Base
  </label>
  <Textarea
    name="customerBase"
    value={acquisitionData.customerBase}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="timeline" className="block text-sm font-medium">
    Timeline
  </label>
  <Textarea
    name="timeline"
    value={acquisitionData.timeline}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="financingDetails" className="block text-sm font-medium">
    Financing Details
  </label>
  <Textarea
    name="financingDetails"
    value={acquisitionData.financingDetails}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="sellerFinancing" className="block text-sm font-medium">
    Seller Financing
  </label>
  <Textarea
    name="sellerFinancing"
    value={acquisitionData.sellerFinancing}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

<div className="mb-4">
  <label htmlFor="additionalInfo" className="block text-sm font-medium">
    Additional Information
  </label>
  <Textarea
    name="additionalInfo"
    value={acquisitionData.additionalInfo}
    onChange={handleChange}
    className="mt-1 p-2 w-full border-gray-300 rounded-md"
  />
</div>

{/* Incorporate the above Textarea fields into your form for legal disputes, compliance, licenses and permits, operations management, key employees, customer base, timeline, financing details, seller financing, and additional information */}



          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Submit Acquisitions Data
          </button>
        </form>
      </div>
    </div>
  );
}
