import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {}, []);
  return children;
};
