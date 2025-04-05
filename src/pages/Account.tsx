
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProfileManagement from '@/components/user/ProfileManagement';
import { Separator } from '@/components/ui/separator';

const Account = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Hesabım</h1>
        <Separator className="mb-6" />
        <ProfileManagement />
      </div>
    </Layout>
  );
};

export default Account;
