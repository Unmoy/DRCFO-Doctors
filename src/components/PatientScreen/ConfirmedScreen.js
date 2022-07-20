import React from "react";
import docImage from "../../assets/images/docimage.png";
import "./AppointmentCard.css";
const ConfirmedScreen = ({ item }) => {
  return (
    <div className="myappointment--card">
      <div className="myappointment--card--header">
        <div className="myappointment--card--header--content">
          <img
            src={docImage}
            alt="user"
            className="myappointment--card--image"
          />
          <div>
            <span className="myappointment--card--name">
              {item.detials.name}
            </span>
            <span className="myappointment--card--header--detials">
              Age: {item.detials.age}
            </span>
            <span className="myappointment--card--header--detials">
              {item.detials.phone}
            </span>
          </div>
        </div>
        <div>
          {item.status.status === "YET_TO_VISIT" && (
            <button className="myappointment--card--status status--upcoming">
              Yet to Visit
            </button>
          )}
          {/* {props.status === "completed" && (
          <div className="myappointment--card--status status--completed">
            Appointment completed
          </div>
        )}
        {props.status === "cancelled" && (
          <div className="myappointment--card--status status--cancelled">
            Cancelled
          </div>
        )} */}
        </div>
      </div>
      <div className="myappointment--card--detials">
        <div className="myappointment--card--detials--section myappointment--card--detials--content--div">
          <div className="myappointment--card--detials--title">Address</div>
          <div className="myappointment--card--detials--address">
            {/* {item?.clinic?.address?.street}, {item?.clinic?.address?.area},{" "}
            {item?.clinic?.address?.city}, {item?.clinic?.address?.state}-
            {item?.clinic?.address?.pincode} */}
            Ardee city, Sec-52, Block c, gurugram, Haryana India-170003
          </div>
        </div>
        <div className="myappointment--card--detials--section">
          <div className="myappointment--card--detials--lookup">
            Next Look-Up Date
          </div>
          <div className="myappointment--card--detials--content myappointment--card--detials--content--other">
            <span className="apppointent_card_date">
              <svg
                width="26"
                height="22"
                viewBox="0 0 26 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="myappointment--card--detials--content--svg"
              >
                <path
                  d="M25.3 2.00248V21.4592C25.129 21.7923 24.8874 22.0007 24.4775 22C18.0729 21.9961 11.6678 21.9941 5.26228 21.9941C4.75203 21.9941 4.45102 21.693 4.4497 21.1869C4.4497 20.5599 4.4497 19.9323 4.4497 19.3054V19.0611H4.14276C3.03205 19.0611 1.92068 19.0611 0.808642 19.0611C0.43437 19.0611 0.167033 18.8887 0.0515175 18.5837C-0.0639984 18.2787 0.0145524 17.9907 0.28915 17.7491C0.934203 17.1767 1.49028 16.5132 1.93938 15.78C3.62327 13.0886 4.36719 10.1262 4.44112 6.98619C4.47743 5.42335 4.44838 3.85855 4.45036 2.29441C4.45036 1.75692 4.74609 1.46564 5.29066 1.46564C6.41898 1.46564 7.54685 1.46564 8.67429 1.46564H8.94624C8.94624 1.22792 8.94624 1.02481 8.94624 0.8217C8.94624 0.329926 9.25319 -0.00445491 9.69413 0.000116702C10.1252 0.00403522 10.4248 0.334497 10.4281 0.811904C10.4281 1.02742 10.4281 1.24359 10.4281 1.45193H14.1339C14.1339 1.22792 14.1339 1.01763 14.1339 0.807985C14.1339 0.332538 14.4402 0.00142288 14.8719 0.000116702C15.3036 -0.00118947 15.6118 0.32666 15.6158 0.801454C15.6158 1.01828 15.6158 1.23445 15.6158 1.4467H19.3711C19.3711 1.20833 19.3678 0.989543 19.3711 0.769453C19.3777 0.329925 19.6839 0.00730066 20.0972 0.000116702C20.5104 -0.00706725 20.8444 0.31817 20.8523 0.7688C20.8563 0.994115 20.8523 1.22008 20.8523 1.4676H21.1414C22.1976 1.4676 23.2498 1.48262 24.3026 1.46042C24.7647 1.44866 25.102 1.57863 25.3 2.00248ZM23.8287 7.34538H5.92303C5.74876 11.0804 4.77117 14.5489 2.44171 17.5975H2.63973C8.30464 17.5975 13.9695 17.5954 19.6344 17.591C19.7601 17.5826 19.8785 17.53 19.9684 17.4428C20.6159 16.7807 21.1749 16.0393 21.6319 15.2366C22.6834 13.4282 23.3085 11.4762 23.6121 9.42024C23.7112 8.73646 23.756 8.04941 23.8287 7.34538ZM5.94019 5.8472H23.8056V2.94619H20.853C20.853 3.17085 20.853 3.38115 20.853 3.59144C20.849 4.06623 20.544 4.3967 20.1123 4.39735C19.6806 4.398 19.3744 4.06689 19.3711 3.5934C19.3711 3.37658 19.3711 3.1604 19.3711 2.95142H15.6151C15.6151 3.1911 15.6184 3.40858 15.6151 3.63063C15.6079 4.06885 15.299 4.39147 14.8851 4.39735C14.4712 4.40323 14.1412 4.07603 14.1346 3.62736C14.1313 3.40139 14.1346 3.17608 14.1346 2.94815H10.4275C10.4275 3.17542 10.4275 3.38637 10.4275 3.59732C10.4235 4.0695 10.1146 4.39996 9.68225 4.39735C9.24989 4.39474 8.94954 4.06362 8.94624 3.58752C8.94624 3.372 8.94624 3.15583 8.94624 2.94488H5.94151L5.94019 5.8472ZM23.8069 14.2224C23.7409 14.3569 23.7032 14.4333 23.6669 14.5104C22.9316 16.0706 22.0319 17.5192 20.7757 18.7313C20.6633 18.8435 20.5286 18.9315 20.3801 18.9896C20.2316 19.0477 20.0726 19.0747 19.913 19.0689C15.3518 19.062 10.7905 19.0602 6.22931 19.0637H5.94283V20.5175H23.8069V14.2224Z"
                  fill="black"
                />
              </svg>
              {item.slot.date}
            </span>
            <span className="myappointment--card--detials--content--time">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="myappointment--card--detials--content--svg"
              >
                <path
                  d="M12.6992 24.0125H11.2921C10.8904 23.9619 10.4864 23.9255 10.0876 23.8592C7.58055 23.4405 5.39532 22.3611 3.59711 20.564C0.900367 17.8684 -0.286503 14.5921 0.0582235 10.7983C0.289607 8.25192 1.2862 6.00092 2.9887 4.08818C5.25027 1.54824 8.09559 0.180494 11.4918 0.0148838C13.8596 -0.100221 16.086 0.451812 18.1126 1.68801C21.2281 3.589 23.1414 6.34212 23.8132 9.93914C23.8972 10.3896 23.9389 10.8476 24 11.3022V12.7093C23.9806 12.8778 23.9612 13.047 23.9424 13.2155C23.6553 15.7995 22.6687 18.0781 20.9274 20.0108C19.0787 22.0627 16.7883 23.3436 14.0628 23.8257C13.6112 23.9056 13.1531 23.9508 12.6986 24.0125H12.6992ZM12.0009 1.86361C6.41189 1.85715 1.86995 6.39262 1.85585 11.9946C1.84176 17.5772 6.37665 22.1256 11.9792 22.1473C17.5659 22.169 22.1372 17.6036 22.136 12.0046C22.1348 6.40848 17.5988 1.87007 12.0009 1.86361Z"
                  fill="black"
                />
                <path
                  d="M11.0624 9.28677C11.0624 8.37239 11.0547 7.45801 11.0653 6.54363C11.0735 5.83891 11.7137 5.39141 12.3385 5.63748C12.7179 5.78664 12.9287 6.12961 12.9287 6.61234C12.9299 8.1598 12.9375 9.70725 12.9217 11.2547C12.9187 11.5313 13.0092 11.6881 13.2247 11.8461C14.2266 12.5802 15.2144 13.333 16.2086 14.0771C16.5545 14.3361 16.7184 14.6703 16.6109 15.0972C16.45 15.7362 15.7259 16.0004 15.1756 15.621C14.8285 15.3814 14.4979 15.1189 14.1608 14.8658C13.311 14.2286 12.4683 13.5809 11.608 12.9584C11.2239 12.68 11.0495 12.3394 11.0583 11.8661C11.0747 11.0069 11.063 10.1465 11.063 9.28677H11.0624Z"
                  fill="black"
                />
              </svg>
              {item.slot.time}
            </span>
          </div>
        </div>
      </div>
      <div className="myappointment--card--footer">
        <button className="myappointment--card--footer--booking">
          Booking Confirmed
        </button>
      </div>
    </div>
  );
};

export default ConfirmedScreen;
