import React, { useEffect, useState } from "react";
import "./AppointmentListForm.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
const AppointmentListForm = () => {
  const [confirmedData, setConfirmedData] = useState([]);
  const [filteredConfirmedData, setFilteredConfirmedData] = useState([]);
  const [selectedDay, setSelectedDay] = useState({
    from: null,
    to: null,
  });
  const id = localStorage.getItem("doctor_id");
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
    if (selectedDay.from && selectedDay.to) {
      var frommonthName = gsDayNames[selectedDay?.from?.month];
      var tomonthName = gsDayNames[selectedDay?.to?.month];
      const from = `${frommonthName}${selectedDay?.from?.day},${selectedDay?.from?.year}`;
      const to = `${tomonthName}${selectedDay?.to?.day},${selectedDay?.to?.year}`;
      setDateFrom(from);
      setDateTo(to);
    }
  }, [selectedDay]);
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
        console.log(data);
      });
  }, [id]);
  const tableFilter = () => {
    const filteredData = confirmedData.filter((item) => {
      const appointmentDate = new Date(item.appointmentSlot);
      const from = new Date(datefrom);
      const to = new Date(dateto);
      console.log(appointmentDate, to, from);
      if (appointmentDate > from && appointmentDate <= to) {
        return item;
      }
    });
    setFilteredConfirmedData(filteredData);
  };
  useEffect(() => {
    if (datefrom && dateto) {
      tableFilter();
    }
  }, [dateto, datefrom]);
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
  const renderCustomInput = ({ ref }) => (
    <label className="date_filter_input" ref={ref}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        className={
          selectedDay.from && selectedDay.from
            ? "date_filter_input_icon activated"
            : "date_filter_input_icon"
        }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>

      <input
        readOnly
        ref={ref}
        className="legal_form__date_input"
        style={{
          outline: "none",
          border: "none",
          cursor: "pointer",
          marginRight: "20px",
          marginTop: "-10px",
        }}
      />
    </label>
  );
  const reset = () => {
    setSelectedDay({ from: null, to: null });
    setFilteredConfirmedData(confirmedData);
  };
  return (
    <div>
      <div className="d-flex justify-content-end align-items-center">
        {selectedDay.from && selectedDay.to && (
          <p className="legal_reset_btn" onClick={reset}>
            Reset
          </p>
        )}
        <DatePicker
          value={selectedDay}
          onChange={setSelectedDay}
          renderInput={renderCustomInput}
          className="date_filter"
        />
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
              {/* /get/docter/export?id=629103307f65ef3c93ad26c0&file=excel&from=June29,2022&to=July01,2022 */}
              <a
                class="dropdown-item"
                href={
                  selectedDay
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
