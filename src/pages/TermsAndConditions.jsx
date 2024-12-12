import { Typography, Box, Container } from "@mui/material";
import "../css/termsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <>
      <div className="terms-and-conditions">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2, color: "#FFD700" }}
          >
            Terms and Conditions
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#FFD700" }}>
            Effective Date: December 11, 2024
          </Typography>
        </Box>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          <strong style={{ color: "#FFD700" }}>These terms and conditions</strong> applies to the webflix app (hereby referred to as "Application") for mobile devices that was created by webflix co. (hereby referred to as "Service Provider") as a Free service.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          Upon downloading or utilizing the Application, you are automatically agreeing to the following terms. <strong style={{ color: "#FFD700" }}>It is strongly advised</strong> that you thoroughly read and understand these terms prior to using the Application. Unauthorized copying, modification of the Application, any part of the Application, or our trademarks is strictly prohibited. Any attempts to extract the source code of the Application, translate the Application into other languages, or create derivative versions are not permitted. All trademarks, copyrights, database rights, and other intellectual property rights related to the Application remain the property of the Service Provider.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          The Service Provider is dedicated to ensuring that the Application is as beneficial and efficient as possible. As such, <strong style={{ color: "#FFD700" }}>they reserve the right</strong> to modify the Application or charge for their services at any time and for any reason. The Service Provider assures you that any charges for the Application or its services will be clearly communicated to you.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          The Application stores and processes personal data that you have provided to the Service Provider in order to provide the Service. <strong style={{ color: "#FFD700" }}>It is your responsibility</strong> to maintain the security of your phone and access to the Application. The Service Provider strongly advise against jailbreaking or rooting your phone, which involves removing software restrictions and limitations imposed by the official operating system of your device. Such actions could expose your phone to malware, viruses, malicious programs, compromise your phone&apos;s security features, and may result in the Application not functioning correctly or at all.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          Please note that the Application utilizes third-party services that have their own Terms and Conditions. Below are the links to the Terms and Conditions of the third-party service providers used by the Application:
        </Typography>

        <Typography sx={{ mb: 2, color: "#FFD700" }}>Google Play Services</Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          Please be aware that the Service Provider does not assume responsibility for certain aspects. Some functions of the Application require an active internet connection, which can be Wi-Fi or provided by your mobile network provider. The Service Provider cannot be held responsible if the Application does not function at full capacity due to lack of access to Wi-Fi or if you have exhausted your data allowance.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          If you are using the application outside of a Wi-Fi area, please be aware that your mobile network provider&apos;s agreement terms still apply. Consequently, you may incur charges from your mobile provider for data usage during the connection to the application, or other third-party charges. By using the application, you accept responsibility for any such charges, including roaming data charges if you use the application outside of your home territory (i.e., region or country) without disabling data roaming. If you are not the bill payer for the device on which you are using the application, they assume that you have obtained permission from the bill payer.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          Similarly, the Service Provider cannot always assume responsibility for your usage of the application. For instance, it is your responsibility to ensure that your device remains charged. If your device runs out of battery and you are unable to access the Service, the Service Provider cannot be held responsible.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          In terms of the Service Provider&apos;s responsibility for your use of the application, it is important to note that while they strive to ensure that it is updated and accurate at all times, they do rely on third parties to provide information to them so that they can make it available to you. The Service Provider accepts no liability for any loss, direct or indirect, that you experience as a result of relying entirely on this functionality of the application.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          The Service Provider may wish to update the application at some point. The application is currently available as per the requirements for the operating system (and for any additional systems they decide to extend the availability of the application to) may change, and you will need to download the updates if you want to continue using the application. The Service Provider does not guarantee that it will always update the application so that it is relevant to you and/or compatible with the particular operating system version installed on your device. However, you agree to always accept updates to the application when offered to you. The Service Provider may also wish to cease providing the application and may terminate its use at any time without providing termination notice to you. Unless they inform you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must cease using the application, and (if necessary) delete it from your device.
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>
          Changes to These Terms and Conditions
        </Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          The Service Provider may periodically update their Terms and Conditions. Therefore, you are advised to review this page regularly for any changes. The Service Provider will notify you of any changes by posting the new Terms and Conditions on this page.
        </Typography>

        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          These terms and conditions are effective as of 2024-12-11
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: "bold", color: "#FFD700" }}>Contact Us</Typography>
        <Typography sx={{ mb: 2, color: "#ADD8E6" }}>
          If you have any questions or suggestions about the Terms and Conditions, please do not hesitate to contact the Service Provider at webflix-xxx-@gmail.com. We will get back to you at the earliest convenience.
        </Typography>
      </div>
    </>
  );
};

export default TermsAndConditions;