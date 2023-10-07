import axios from "axios";
import { NextResponse } from "next/server";
import { FormData } from "@/components/PropertyLeaseForm";

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json();

    const accessToken = process.env.FOXIT_API_KEY;
    if (!accessToken) {
      return NextResponse.json({
        error: "Access token not found",
      });
    }

    const folderResponse = await axios.post(
      `${process.env.FOXIT_BASE_URL}/api/templates/createFolder`,
      {
        folderName: "folder name",
        templateIds: [303830],
        fields: {
          "Length of Time at Present Job": "24 Months",
          "How Long?_1": "12 Months",
          "Reason you are in the US": "Job",
          "First Name": body.applicantFirstName,
          "Current Lease Amount: $_1": "1000",
          "start on_1": body.leaseEndDate,
          "Business Phone": "123456",
          "Visa Type": "H1B",
          "Proposed Monthly Rent $": body.monthlyRent,
          "Pet Weights": "TEST_VALUE pet weight",
          "Reason for Leaving_1": "TEST_VALUE Leaving_1",
          "Application is hereby made to rent the premises generally described as_1":
            body.propertyAddress,
          "(â€œPropertyâ€)": "(â€œPropertyâ€)",
          Work: "Work",
          "Reason for Leaving": "Reason for Leaving",
          "City/State/Zip_1": "Your City/State/Zip",
          Position_1: "Position_1",
          "City/State/Zip_2": "City/State/Zip_2",
          "What Kind?": "What Kind?",
          "Employer Address": "Employer Address",
          "City/State/Zip_3": "City/State/Zip_3",
          Cell: body.cell,
          Supervisor: "Supervisor",
          $: body.leaseApplicationFee,
          Position: "Position",
          "start on": body.leaseStartDate,
          "Address of Property": "Address of Property",
          Employer: "Employer",
          "Yes, I have valid documentation from the Bureau of Citizenship and Immigration Service":
            "true",
          Yes_5: "Yes_5",
          "Yes, I am a US Citizen": "false",
          Yes_4: "false",
          Yes_7: "false",
          Yes_6: "false",
          "Applicantâ€™s Initials": body.applicantName,
          Yes_1: "false",
          "Driverâ€™s License State": body.driverLicenseState,
          "Emergency Contact Information": body.emergencyContact,
          "Business Phone_1": "Business Phone_1",
          "Length of Time at Present Job_1": "Length of Time at Present Job_1",
          "The multiple listing service number for this property, if known, is":
            "The multiple listing service number for this property, if known, is",
          Yes_3: "true",
          "Annual Income_1": "Annual Income_1",
          Yes_2: "true",
          "I have not yet visited or seen the Property in person Nor am I relying on any information,":
            "false",
          "Previous Address": "Previous Address",
          "Address of Property_1": "Address of Property_1",
          "City/State/Zip": "City/State/Zip",
          "Reservation Fee A reservation fee of $": body.reservationFee,
          "Date of Birth": body.dateOfBirth,
          "Driver's License #": body.driverLicenseNumber,
          "Last Name": body.applicantLastName,
          "Email Address": body.email,
          NO: "true",
          "I, the undersigned, understand that": body.ownerName,
          "I have visited the Property and had the opportunity to inspect it I understand that I am":
            "false",
          "SS #": "SS",
          YES: "true",
          Yes: "true",
          "Phone #_1": "7922008811",
          "Names and ages of individuals under 18": "John Doe 18, Jane Doe 16",
          "Home Phone": "body.homePhone",
          "Application is hereby made to rent the premises generally described as":
            body.propertyName,
          "How Long?": "12 Months",
          by: "false",
          "Landlord Address": "Landlord Address",
          "Applicantâ€™s Initials_1": "Applicantâ€™s Initials_1",
          "How Many?": "How Many?",
          "Spouse/Significant Other Name (must fill out a separate application)":
            body.spouseName,
          Supervisor_1: "Supervisor_1",
          "Visa Expiration Date": "Visa Expiration Date",
          No: "false",
          "cash or": "false",
          "Applicantâ€™s Printed Name":
            body.applicantFirstName + " " + body.applicantLastName,
          "Previous Landlord Address": "Previous Landlord Address",
          "Phone #": "7922008811",
          "Previous Employer": "Previous Employer",
          Date: "Date",
          Middle: body.applicantMiddleName,
          No_3: "true",
          No_2: "true",
          "Current Address": "Current Address",
          No_5: "true",
          No_4: "true",
          "Landlord Name": "Landlord Name",
          No_1: "true",
          "Previous Landlord Name": "Previous Landlord Name",
          "Annual Income": "Annual Income",
          "Current Lease Amount: $": "1000",
          "check,": "true",
          No_7: "true",
          No_6: "true",
          No_8: "true",
        },
        parties: [
          {
            firstName: body.applicantFirstName,
            lastName: body.applicantLastName,
            emailId: body.email,
            permission: "FILL_FIELDS_AND_SIGN",
            sequence: 1,
          },
        ],
        custom_field1: {
          name: "property_id",
          value: body._id || "Getting null here!!",
        },
        signInSequence: false,
        createEmbeddedSigningSession: true,
        createEmbeddedSigningSessionForAllParties: true,
        signSuccessUrl: "",
        signDeclineUrl: "",
        themeColor: "#0066CB",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const embeddedSessionURL =
      folderResponse.data.embeddedSigningSessions?.[0]?.embeddedSessionURL;

    if (!embeddedSessionURL) {
      return NextResponse.json({
        error: "Embedded session URL not found",
      });
    }

    return NextResponse.json({
      embeddedSessionURL,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      error: error.message,
    });
  }
}
