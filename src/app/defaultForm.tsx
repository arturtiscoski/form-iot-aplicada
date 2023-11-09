import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Stepper,
  Step,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

function formatExpires(value: string) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

export default function CheckoutForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const onSubmit = (values: any) => {
    axios(process.env.NEXT_PUBLIC_ROUTE + "/saveDados", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card className="w-full px-24 py-4">
      <CardBody>
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>
            <UserIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Usuários
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(0)}>
            <CogIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Biometria
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(0)}>
            <BuildingLibraryIcon className="h-5 w-5" />
            <div className="absolute -bottom-[2.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                RFID
              </Typography>
            </div>
          </Step>
        </Stepper>
      </CardBody>

      <form className="mt-12 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Nome completo
              </Typography>
              <Input
                {...register("name")}
                type="text"
                placeholder="João da Silva"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="my-3">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                E-mail
              </Typography>
              <Input
                {...register("email")}
                type="email"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium "
              >
                Senha numérica
              </Typography>

              <Input
                {...register("password")}
                maxLength={6}
                type="password"
                placeholder="000000"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Código Biometria
              </Typography>
              <Input
                {...register("biometria")}
                placeholder="XX:XX:XX:XX"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Código RFID
              </Typography>
              <Input
                {...register("rfid")}
                placeholder="XX:XX:XX:XX"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </>
        )}
        <div className="my-4 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Anterior
          </Button>
          {isLastStep ? (
            <Button type="submit">Finalizar</Button>
          ) : (
            <Button
              onClick={handleNext}
              type={isLastStep ? "submit" : "button"}
            >
              Próximo
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
