export const UTF_8 = "utf-8";
export const RESTART_MONGO = "docker run -p 27017:27017 -d mongo";
export const STOP_MONGO =
  "docker kill $(docker ps |grep mongo|awk '{print $1}')";
