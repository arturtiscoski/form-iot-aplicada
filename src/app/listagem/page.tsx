"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, ThemeProvider, Typography } from "@material-tailwind/react";
import Link from "next/link";
import axios from "axios";

export default function Listagem() {
  const [data, setData] = useState([] as any[]);
  const TABLE_HEAD = ["Nome", "Email", "Biometria", "RFID"];

  useEffect(() => {
    axios.get((process.env.NEXT_PUBLIC_ROUTE_READ || ''))
      .then((res: any) => {
        console.log('res -> ', res);
        setData(res?.data?.feeds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <Card className="w-full px-24 py-4">
            <CardBody>
              <Link href="/cadastro">
                <Button style={{ marginBottom: 18 }}>
                  Cadastro de usuários
                </Button>
              </Link>

              <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map(({ field1, email, biometry, rfid }, index) => (
                      <tr key={field1} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {field1}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {email}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {biometry}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {rfid}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </CardBody>
          </Card>
        </div>
      </main>
    </ThemeProvider>
  );
}
