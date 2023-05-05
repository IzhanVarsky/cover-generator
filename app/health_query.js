import config from "~/config.json";

export function runHealthQuery(backendPath, succ_callback, err_callback) {
  $.ajax(
    {
      url: `${config.main_host}/${backendPath}/health`,
      type: "get",
      dataType: 'json',
      success: function (res) {
        console.log("Successful health method!");
        console.log(res);
        succ_callback(res);
      },
      error: function (request, status, error) {
        console.log("Error in health method!");
        console.log(request.responseText);
        console.log(status);
        console.log(error);
        err_callback(error);
      }
    }
  );
}