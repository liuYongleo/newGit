import axios from 'axios';

const commonPath = {
    imgCode: function (deviceId) {
        // return `${axios.defaults.baseURL}/common/nofilter/getImage/${deviceId}?t=${new Date().getTime()}`;
    },
};

const path = {
    ...commonPath,
};

export default path;
