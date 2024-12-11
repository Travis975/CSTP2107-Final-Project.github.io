import { Typography, Box, Container } from "@mui/material";
import Navbar from "../components/Navbar"; // Existing local Navbar component

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2, color: "#FFD700" }}
          >
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#FFD700" }}>
            Effective Date: December 11, 2024
          </Typography>
        </Box>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          This privacy policy applies to the webflix app (hereby referred to as "Application") for mobile devices that was created by webflix co. (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>
          What information does the Application obtain and how is it used?
        </Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          The Application does not obtain any information when you download and use it. Registration is not required to use the Application.
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>
          Does the Application collect precise real time location information of the device?
        </Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          This Application does not collect precise information about the location of your mobile device.
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>
          Do third parties see and/or have access to information obtained by the Application?
        </Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          Since the Application does not collect any information, no data is shared with third parties.
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>
          What are my opt-out rights?
        </Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>Children</Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          The Application is not used to knowingly solicit data from or market to children under the age of 13.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          The Service Provider does not knowingly collect personally identifiable information from children. The Service Provider encourages all children to never submit any personally identifiable information through the Application and/or Services. The Service Provider encourage parents and legal guardians to monitor their children&apos;s Internet usage and to help enforce this Policy by instructing their children never to provide personally identifiable information through the Application and/or Services without their permission. If you have reason to believe that a child has provided personally identifiable information to the Service Provider through the Application and/or Services, please contact the Service Provider (webflix-xxx-@gmail.com) so that they will be able to take the necessary actions. You must also be at least 16 years of age to consent to the processing of your personally identifiable information in your country (in some countries we may allow your parent or guardian to do so on your behalf).
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>Security</Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          The Service Provider is concerned about safeguarding the confidentiality of your information. However, since the Application does not collect any information, there is no risk of your data being accessed by unauthorized individuals.
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>Changes</Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to their Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          This privacy policy is effective as of 2024-12-11
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>Your Consent</Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by the Service Provider.
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>Contact Us</Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at webflix-xxx-@gmail.com.
        </Typography>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
