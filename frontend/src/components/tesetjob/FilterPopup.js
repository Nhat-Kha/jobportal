import {
  Chip,
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Button,
  Dialog,
  Rating,
} from "@material-tailwind/react";

export const filterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    <div
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-20 bg-overlay-70"
    >
      <div className="grid grid-cols-4 bg-white rounded-xl gap-4 auto-cols-max">
        <div className=" flex items-center col-span-4">
          <p className="p-2">Job Type</p>
          <Card className="w-full max-w-[24rem]">
            <List className="flex-row">
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
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
                    React.js
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-vue"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id="horizontal-list-vue"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Vue.js
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-svelte"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id="horizontal-list-svelte"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Svelte.js
                  </Typography>
                </label>
              </ListItem>
            </List>
          </Card>
        </div>
        <div>salary</div>
        <div>skill</div>
      </div>
    </div>
  );
};
