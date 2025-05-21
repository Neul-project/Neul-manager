interface AdminUser {
  user: {
    name: string;
    phone: string;
    email: string;
  };
  birth: string;
  gender: string;
  profileImage: string;
  certificateName: string;
  certificateName2?: string;
  certificateName3?: string;
  desiredPay: number;
  experience: string;
}
