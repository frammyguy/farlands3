import React from "react";
import { useEffect } from "react";
import axios from "axios";

import useCustomTranslation from "../../locales/useCustomTranslation";
import First from "./first/first";
import Benefits from "./benefits/benefits";
import Countries from "./countries/countries";
import Admin from "./admin/admin";

export default function Main() {
  const { t } = useCustomTranslation();
  const [countries, setCountries] = React.useState([]);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        "https://files.farlands.co/getCountries.php",
        {}
      );
      if (res.data) {
        const data = res.data.split("\n");
        const c = [];
        data.forEach((e) => {
          const row = e.split("\t");
          const obj = {
            ID: row[0],
            Name: row[1],
            Mayor: row[2],
            Money: row[3],
            Players: row[4],
            Created: row[5],
            Flag: row[6],
            Capital: row[7],
            BG: row[8],
          };
          if (c.length < 3) c.push(obj);
        });
        setCountries(c);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <First t={t} />
      <Benefits t={t} />
      <Countries t={t} countries={countries} />
      <Admin t={t} />
    </div>
  );
}