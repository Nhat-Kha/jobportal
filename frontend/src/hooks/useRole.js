import { useState } from "react";

export default function useRole() {
  const [role, setRole] = useState("");

  //   useEffect(() => {
  //     const auth = getAuth();
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         const companyRef = doc(db, "companies", user.uid);
  //         getDoc(companyRef).then((d1) => {
  //           if (d1.exists()) {
  //             setRole("company");
  //           } else {
  //             setRole("greeter");
  //           }
  //         });
  //       } else {
  //         setRole("none");
  //       }
  //     });
  //   }, []);

  return role;
}
