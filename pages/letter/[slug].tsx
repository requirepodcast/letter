import React from "react";
import { useRouter } from "next/router";

const Letter: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Letter: {slug}</p>;
};

export default Letter;
