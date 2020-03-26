import moment from "moment";

const formatDate = dateToFormat => {
  return moment(dateToFormat)
    .subtract(2, "seconds")
    .fromNow();
};

export { formatDate };
