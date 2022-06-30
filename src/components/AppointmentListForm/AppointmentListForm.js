import React, { useEffect, useState } from "react";
import "./AppointmentListForm.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
const AppointmentListForm = () => {
  const [confirmedData, setConfirmedData] = useState([]);
  const id = localStorage.getItem("doctor_id");
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/docter/legal?id=${id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setConfirmedData(data));
  }, [id]);

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

    const data = confirmedData.map((item, index) => [
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

  return (
    <div>
      <div className="d-flex justify-content-end me-5">
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
                href={`https://reservefree-backend.herokuapp.com/get/docter/export?id=${id}&file=excel`}
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
          {confirmedData.map((item, index) => (
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
