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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function FilterPopup(props) {
  const {
    open,
    handleClose,
    searchOptions,
    setSearchOptions,
    getData,
    handleJobTypeChange,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState([0, 400]);

  const changeWidth = (event) => {
    setValues(event.target.value);
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-white border-gray-500"
        variant="gradient"
      >
        <FontAwesomeIcon icon={faFilter} className="text-black" />
        <span className="text-black">Filter</span>
      </Button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="bg-overlay-70"
      >
        <Modal.Header className="bg-gray-200 border-none rounded-t-2xl">
          Select
        </Modal.Header>
        <Modal.Body className="bg-gray-100">
          <div className=" grid grid-rows-3 space-y-6">
            <div className="flex flex-rows justify-around items-center">
              <p className="flex justify-start">Job Type</p>
              <div className="flex gap-4 w-3/4">
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-2">
                    <input
                      type="checkbox"
                      id="fullTimeCheckbox"
                      checked={searchOptions.jobType.fullTime}
                      onChange={() => {
                        handleJobTypeChange("fullTime");
                      }}
                    />
                    <label htmlFor="fullTimeCheckbox">Full time</label>
                  </ListItemPrefix>
                </label>
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-2">
                    <input
                      type="checkbox"
                      id="fullTimeCheckbox"
                      checked={searchOptions.jobType.partTime}
                      onChange={() => {
                        handleJobTypeChange("partTime");
                      }}
                    />
                    <label htmlFor="fullTimeCheckbox">Part time</label>
                  </ListItemPrefix>
                </label>
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-2">
                    <input
                      type="checkbox"
                      id="fullTimeCheckbox"
                      checked={searchOptions.jobType.wfh}
                      onChange={() => {
                        handleJobTypeChange("wfh");
                      }}
                    />
                    <label htmlFor="fullTimeCheckbox">Full time</label>
                  </ListItemPrefix>
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
                {/* <MultiRangeSlider
                  min={0}
                  max={10000}
                  value={searchOptions.salary}
                  onChange={(event, value, min, max) =>
                    setSearchOptions({
                      ...searchOptions,
                      salary: value,
                    })
                  }
                /> */}
              </div>
            </div>
            <div className="flex flex-rows justify-around items-center">
              <p className="flex justify-start">Duration</p>
              <div className="w-3/4">
                <select
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  value={searchOptions.duration}
                  onChange={(event) =>
                    setSearchOptions({
                      ...searchOptions,
                      duration: event.target.value,
                    })
                  }
                >
                  <option className="rounded mb-4 text-gray-950" value="0">
                    All
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="1">
                    1
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="2">
                    2
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="3">
                    3
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="4">
                    4
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="5">
                    5
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="6">
                    6
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="7">
                    7
                  </option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-gray-200 rounded-b-2xl">
          <Button
            onClick={() => getData()}
            className="bg-blue-400 hover:bg-blue-600 mr-5"
          >
            I accept
          </Button>
          <Button
            color="gray"
            className="hover:bg-gray-400 hover:text-white border-none"
            onClick={() => setOpenModal(false)}
          >
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
