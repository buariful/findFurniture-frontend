import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Rating,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as RatedIcon,
  AcademicCapIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { HeartIcon as UnratedIcon } from "@heroicons/react/24/outline";

export default function Example() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <Button onClick={openDrawer} className="bg-red-500 p-24 shadow-none ">
        Open Drawer
      </Button>
      <Bars3Icon className="w-6" />
      <Rating
        ratedColor="red"
        ratedIcon={<AcademicCapIcon className="h-6 w-6" />}
        unratedIcon={<UnratedIcon className="h-6 w-6" />}
      />

      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          Material Tailwind features multiple React and HTML components, all
          written with Tailwind CSS classes and Material Design guidelines.
        </Typography>
        <div className="flex gap-2">
          <Button size="sm">Get Started</Button>
          <Button size="sm" variant="outlined">
            Documentation
          </Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
