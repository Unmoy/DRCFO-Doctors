import React, { useEffect, useState } from "react";
import "./AppointmentListForm.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ClickOutHandler = require("react-onclickout");
const AppointmentListForm = () => {
  const [confirmedData, setConfirmedData] = useState([]);
  const [filteredConfirmedData, setFilteredConfirmedData] = useState([]);
  const id = localStorage.getItem("doctor_id");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datefrom, setDateFrom] = useState("");
  const [dateto, setDateTo] = useState("");
  console.log(datefrom, dateto);
  var gsDayNames = [
    " ",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    let d = new Date(startDate);
    const month = d.getMonth() + 1;
    var monthName = gsDayNames[month];
    let day = d.getDate();
    let year = d.getFullYear();
    // July01,2022
    setDateFrom(`${monthName}${day > 10 ? day : `0${day}`},${year}`);
    let endd = new Date(endDate);
    const endmonth = endd.getMonth() + 1;
    var endmonthName = gsDayNames[endmonth];
    let endday = endd.getDate();
    let endyear = endd.getFullYear();
    // July01,2022
    setDateTo(
      `${endmonthName}${endday > 10 ? endday : `0${endday}`},${endyear}`
    );
  }, [startDate, endDate]);
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/docter/legal?id=${id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFilteredConfirmedData(data);
        setConfirmedData(data);
        // console.log(data);
      });
  }, [id]);
  const tableFilter = () => {
    const filteredData = confirmedData.filter((item) => {
      const appointmentDate = new Date(item.appointmentSlot);
      const from = new Date(startDate);
      const to = new Date(endDate);
      console.log(appointmentDate, to, from);
      if (appointmentDate > from && appointmentDate <= to) {
        return item;
      }
    });
    setFilteredConfirmedData(filteredData);
  };
  useEffect(() => {
    if (startDate && endDate) {
      tableFilter();
    }
  }, [startDate, endDate]);
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    // doc.setFontSize(16);

    const title = "FORM NO. 3C";
    const title2 = "[See  rule 6F(3)]";
    const title3 = "Form of daily case register";
    const title4 =
      "[TO BE MAINTAINED BY PRACTITIONERS OF ANY SYSTEM OF MEDICINE, I.E., PHYSICIANS, SURGEONS, DENTISTS, PATHOLOGISTS, RADIOLOGISTS, VAIDS, HAKIMS, ETC.]";
    const headers = [
      [
        "Date",
        "Sl No",
        "Patient's Name",
        "Nature of professional services rendered, i.e., general consultation, surgery, injection, visit, etc",
        "Fees received",
        "Date of receipt",
      ],
    ];

    const data = filteredConfirmedData.map((item, index) => [
      item?.slot?.date,
      index + 1,
      item?.detials?.name,
      item.prescription?.generalAdvice,
      item?.fees,
      item?.status?.paymentDate,
    ]);

    let content = {
      startY: 180,
      head: headers,
      body: data,
      headStyles: { fillColor: [124, 95, 240] },
      columnStyles: {
        0: { cellWidth: 80 },
        2: { cellWidth: 100 },
      },
    };

    doc.text(title, doc.internal.pageSize.getWidth() / 2, 50, {
      align: "center",
    });
    doc.text(title2, doc.internal.pageSize.getWidth() / 2, 80, {
      align: "center",
    });
    doc.text(title3, doc.internal.pageSize.getWidth() / 2, 100, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.text(title4, doc.internal.pageSize.getWidth() / 2, 120, {
      align: "center",
      maxWidth: 500,
    });
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredConfirmedData(confirmedData);
  };

  const [open, setOpen] = useState(false);
  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };
  const clickOut = (e) => {
    setOpen(false);
  };
  return (
    <div>
      <div className="d-flex justify-content-end align-items-center legal_topBar">
        {startDate && endDate && (
          <p className="legal_reset_btn" onClick={reset}>
            Reset
          </p>
        )}
        <p onClick={() => setOpen(!open)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className={
              !startDate && !endDate
                ? "legal_filter_input_icon"
                : "legal_filter_input_icon activated"
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </p>

        {open && (
          <ClickOutHandler onClickOut={clickOut}>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              calendarClassName="calender_range"
            />
          </ClickOutHandler>
        )}

        {/* <DatePicker
          value={selectedDay}
          onChange={setSelectedDay}
          renderInput={renderCustomInput}
          className="date_filter"
          calendarRangeBetweenClassName="calendarRange"
        /> */}
        {/* <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} /> */}
        <div class="export_dropdown">
          <p
            class="btn btn-primary dropdown-toggle export_btn "
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Export
          </p>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li onClick={exportPDF} class="dropdown-item">
              Export as PDF
            </li>
            <li>
              <a
                class="dropdown-item"
                href={
                  startDate && endDate
                    ? `https://reservefree-backend.herokuapp.com/get/docter/export?id=${id}&file=excel&from=${datefrom}&to=${dateto}`
                    : `https://reservefree-backend.herokuapp.com/get/docter/export?id=${id}&file=excel`
                }
              >
                Export as XLS
              </a>
            </li>
          </ul>
        </div>
      </div>
      <table className="appointment_table">
        <thead>
          <tr>
            <th className="date_row">Date</th>
            <th className="serial_row">Sl No.</th>
            <th className="name_row">Patient's Name</th>
            <th>
              Nature of professional services rendered, i.e., general
              consultation, surgery, injection, visit, etc.
            </th>
            <th>Fees received</th>
            <th className="receipt_row">Date of receipt </th>
          </tr>
        </thead>
        <tbody>
          {filteredConfirmedData.map((item, index) => (
            <tr key={item._id}>
              <td>{item?.slot?.date}</td>
              <td className="text-center">{index + 1}</td>
              <td>{item?.detials?.name}</td>
              <td>{item.prescription.generalAdvice}</td>
              <td>{item?.fees}</td>
              <td>
                {item.status.paymentDate.length
                  ? item.status.paymentDate
                  : "Paid On Visit"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentListForm;
