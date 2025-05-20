import AdminDetail from "@/features/AdminDetail";
import { useRouter } from "next/router";

const AdminDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return null;

  return <AdminDetail id={id as string} />;
};

export default AdminDetailPage;
