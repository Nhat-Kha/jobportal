import {
  Card,
  Checkbox,
  ListItemPrefix,
  Option,
  Select,
  Slider,
  Typography,
} from "@material-tailwind/react";
import { Button, List, ListItem, Modal } from "flowbite-react";
import { useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";

export default function FilterPopup() {
  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState([0, 400]);

  const changeWidth = (event) => {
    setValues(event.target.value);
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-gray-300"
        variant="gradient"
      >
        Toggle modal
      </Button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="bg-overlay-70"
      >
        <Modal.Header>Select</Modal.Header>
        <Modal.Body>
          <div className=" grid grid-rows-3 space-y-6">
            <div className="flex flex-rows justify-around items-center">
              <p className="flex justify-start">Job Type</p>
              <div className="flex gap-4 w-3/4">
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-2">
                    <Checkbox
                      id="horizontal-list-react"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Full time
                  </Typography>
                </label>
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-2">
                    <Checkbox
                      id="horizontal-list-react"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Parttime
                  </Typography>
                </label>
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-2">
                    <Checkbox
                      id="horizontal-list-react"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    ...
                  </Typography>
                </label>
              </div>
            </div>
            <div className="flex flex-rows justify-around items-center">
              <p className="flex justify-start">Salary</p>
              <div className="w-96">
                {/* <input
                  type="range"
                  value={values[0]}
                  onChange={changeWidth}
                  min={1}
                  max={400}
                  className="w-96"
                />
                <input
                  type="range"
                  value={values}
                  onChange={changeWidth}
                  min={1}
                  max={400}
                  className="w-96"
                />
                <div>Start:{values}</div>
                <div>Start:{values}</div> */}
                <MultiRangeSlider
                  min={0}
                  max={10000}
                  onChange={({ min, max }) =>
                    console.log(`min = ${min}, max = ${max}`)
                  }
                />
              </div>
            </div>
            <div className="flex flex-rows justify-around items-center">
              <p className="flex justify-start">Duration</p>
              <div className="w-3/4">
                <select className="block border border-grey-light w-full p-3 rounded mb-4">
                  <option className="rounded mb-4 text-gray-950">All</option>
                  <option className="rounded mb-4 text-gray-950">1</option>
                  <option className="rounded mb-4 text-gray-950">2</option>
                  <option className="rounded mb-4 text-gray-950">3</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setOpenModal(false)}
            className="bg-blue-200 hover:bg-blue-500 mr-5"
          >
            I accept
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
