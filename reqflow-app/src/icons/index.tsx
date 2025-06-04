import { SvgIcon, SvgIconProps } from "@mui/material";

export const Icons = {
  eyeOpen: (props: SvgIconProps) => {
    return (
      <SvgIcon
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <path
          d="M6.34315 8.65686L3 12L6.34315 15.3432C9.46734 18.4674 14.5327 18.4674 17.6569 15.3432L21 12L17.6569 8.65687C14.5327 5.53267 9.46734 5.53267 6.34315 8.65686Z"
          stroke="#686B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
          stroke="#686B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </SvgIcon>
    );
  },
  eyeClosed: (props: SvgIconProps) => {
    return (
      <SvgIcon
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M10.5858 10.5858C10.9477 10.2239 11.4477 10 12 10C13.1046 10 14 10.8954 14 12C14 12.5523 13.7761 13.0523 13.4142 13.4142M10.5858 10.5858L13.4142 13.4142M10.5858 10.5858L7.61839 7.61839M13.4142 13.4142L16.3816 16.3816M21 21L16.3816 16.3816M16.3816 16.3816C16.8327 16.0858 17.2604 15.7396 17.6569 15.3431L21 12L17.6569 8.65685C14.9291 5.92913 10.7217 5.58297 7.61839 7.61839M7.61839 7.61839L3 3M5 10L3 12L6.34315 15.3431C8.1601 17.1601 10.6336 17.9204 13 17.6239"
          stroke="#686B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </SvgIcon>
    );
  },
  alert: (props: SvgIconProps) => {
    return (
      <SvgIcon
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <path
          d="M12 17V13M12 9H12.01M17.9262 21H6.07386C3.79205 21 2.34556 18.5536 3.44521 16.5542L10.2476 4.18624C11.0075 2.80469 12.9926 2.80469 13.7525 4.18624L20.5549 16.5542C21.6545 18.5536 20.208 21 17.9262 21Z"
          stroke="#686B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </SvgIcon>
    );
  },
  file: (props: SvgIconProps) => {
    return (
      <SvgIcon
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M7.22158 14.7279L12.7017 9.24784C13.3851 8.56443 14.4931 8.56443 15.1765 9.24784V9.24784C15.86 9.93126 15.86 11.0393 15.1765 11.7227L9.69646 17.2028C8.32962 18.5696 6.11354 18.5696 4.74671 17.2028V17.2028V17.2028C3.37987 15.836 3.37987 13.6199 4.74671 12.253L11.2874 5.71231C13.3377 3.66206 16.6618 3.66206 18.7121 5.71231V5.71231C20.7623 7.76256 20.7623 11.0867 18.7121 13.1369L12.1713 19.6777"
          stroke="#686B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </SvgIcon>
    );
  },
  image: (props: SvgIconProps) => {
    return (
      <SvgIcon
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M3 16V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V16M3 16V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V16M3 16L7.58579 11.4142C8.36683 10.6332 9.63317 10.6332 10.4142 11.4142L14 15M17 18L14 15M14 15L15.5858 13.4142C16.3668 12.6332 17.6332 12.6332 18.4142 13.4142L21 16M18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z"
          stroke="#686B6E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </SvgIcon>
    );
  },
};
