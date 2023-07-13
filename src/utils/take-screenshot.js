import html2canvas from "html2canvas";
import makeFetchRequest from "./make-fetch-request";
import { updateProject } from "../services/projects-api";

const takeScreenshot = async (headers, projectId) => {
  const element = document.getElementById("screenshot");
  if (!element) return;

  const canvas = await html2canvas(element);
  const base64image = await canvas.toDataURL("image/png");

  // save new screenshot to db
  const body = { field: "screenshot", data: base64image };
  await makeFetchRequest(() => updateProject(headers, projectId, body));
};

export default takeScreenshot;