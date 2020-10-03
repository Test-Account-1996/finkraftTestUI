import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { contactsApi } from "../config/Config";
import Loader from "react-loader-spinner";

export default function ContactsTable() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get(contactsApi)
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setIsError(true);
      });
  }, []);

  if (loading)
    return (
      <Loader
        className="loader"
        type="Puff"
        color="#00BFFF"
        height={200}
        width={200}
      />
    );
  else
    return (
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Work Phones</th>
            <th>GS Treatment</th>
            <th>Recievables</th>
            <th>Payables</th>
          </tr>
        </thead>
        {isError ? (
          <div className="error">
            Oops! We ran into an error. Please try again later
          </div>
        ) : (
          <tbody>
            {contacts.map((contact) => (
              <tr>
                <td>{contact.contact_name}</td>
                <td>{contact.company_name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.gst_treatment}</td>
                <td>{contact.outstanding_receivable_amount}</td>
                <td>{contact.outstanding_payable_amount}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    );
}
