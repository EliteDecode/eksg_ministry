import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import { useFormik } from "formik";
import { Input } from "../ui/input";
import { updateSchoolSchema } from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { updateSchool } from "@/features/schools/schoolSlice";
import { lgArray } from "@/lib/utils";
import { reset } from "@/features/students/studentSlice";

export function EditSchoolForm() {
  const { singleSchool, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.Adminschools
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && message === "school updated successfully") {
      toast.success("School updated successfully", {
        onClose: () => {
          window.location.reload();
        },
      });
    }

    if (isError) {
      toast.error("something went wrong", {});
    }

    if (isSuccess && isError) {
      dispatch(reset());
    }
  }, [isLoading, isError, isLoading, dispatch, message]);

  const formik = useFormik({
    initialValues: {
      school_name: singleSchool?.school_name || "",
      local_government: singleSchool?.local_government
        ? lgArray.find((lg) => lg.lg_name == singleSchool?.local_government)
            .lg_code
        : "",
      school_code: singleSchool?.school_code || "",
      owner: singleSchool?.owner.toString() || "",
      exam_type:
        singleSchool?.exam_types?.[0]?.exam_type == "CE"
          ? "1"
          : singleSchool?.exam_types?.[0]?.exam_type == "JSS3"
          ? "2"
          : "3" || "",
      pin_limit: singleSchool?.pin_limit || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {
        schoolId: singleSchool?.id,
        school_name: values.school_name,
        lg_id: values.local_government,
        pin_limit: values.pin_limit,
        owner: values.owner,
        school_code: values.school_code,
        exam_type_id: "2",
      };

      dispatch(updateSchool(data));
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit School Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit School Information</DialogTitle>
          <DialogDescription>
            Make changes school information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <Box className="mt-5 w-full ">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="name">
                    School Name
                  </Label>
                  <Input
                    placeholder="e.g. Adventist school"
                    name="school_name"
                    value={formik.values.school_name}
                    onChange={formik.handleChange}
                    className="text-[12px]"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.school_name && formik.errors.school_name ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.school_name}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="lga">
                    Local Government Area {formik.values.local_government}
                  </Label>
                  <Select
                    value={formik.values.local_government.toString()}
                    onValueChange={(value) =>
                      formik.setFieldValue("local_government", value)
                    }
                    name="local_government">
                    <SelectTrigger className="w-[100%] text-xs">
                      <SelectValue placeholder="Select " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>LGA </SelectLabel>
                        {lgArray?.map((item, index) => (
                          <SelectItem
                            value={item.lg_code.toString()}
                            key={index}>
                            {item?.lg_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {formik.touched.local_government &&
                  formik.errors.local_government ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.local_government}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="school_code">
                    School Code
                  </Label>
                  <Input
                    placeholder="e.g. adventistschool@gmail.com"
                    name="school_code"
                    value={formik.values.school_code}
                    onChange={formik.handleChange}
                    className="text-[12px]"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.school_code && formik.errors.school_code ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.school_code}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="owner">
                    Owener
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("owner", value)
                    }
                    value={formik.values.owner}
                    name="owner">
                    <SelectTrigger className="w-[100%] text-xs">
                      <SelectValue placeholder="Select " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Classes</SelectLabel>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {formik.touched.owner && formik.errors.owner ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.owner}
                    </span>
                  ) : null}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="exam_type">
                    Exam Type
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      formik.setFieldValue("exam_type", value)
                    }
                    values={formik.values.exam_type.toString()}
                    name="exam_type">
                    <SelectTrigger className="w-[100%] text-xs">
                      <SelectValue placeholder="Select " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Exam Type</SelectLabel>
                        {/* <SelectItem value="1">Primary</SelectItem> */}
                        <SelectItem value="2">JSS3</SelectItem>
                        {/* <SelectItem value="3">SS2</SelectItem> */}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {formik.touched.exam_type && formik.errors.exam_type ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.exam_type}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Box className="">
                  <Label className="text-[11px]" htmlFor="name">
                    Add Quota
                  </Label>
                  <Input
                    placeholder="e.g. Adventist school"
                    name="pin_limit"
                    type="number"
                    value={formik.values.pin_limit}
                    onChange={formik.handleChange}
                    className="text-[12px]"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.pin_limit && formik.errors.pin_limit ? (
                    <span
                      className="text-[10px] text-red-500 -mt-2 leading-none"
                      style={{ fontSize: "10px" }}>
                      (*) {formik.errors.pin_limit}
                    </span>
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
        <DialogFooter>
          <Button
            className="w-full "
            type=""
            disabled={isLoading}
            onClick={formik.handleSubmit}>
            {isLoading ? "Please wait..." : " Update School"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
