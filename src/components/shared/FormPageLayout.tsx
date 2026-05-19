import React from 'react';

interface FormPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function FormPageLayout({ title, description, children }: FormPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
