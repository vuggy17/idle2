/* eslint-disable react/jsx-props-no-spreading */
import Icon from '@ant-design/icons';
import type { GetProps } from 'antd';

type CustomIconComponentProps = GetProps<typeof Icon>;

function GroupSvg() {
  return (
    <svg
      width="24px"
      height="24px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 14V14C13 11.2386 15.2386 9 18 9V9C20.7614 9 23 11.2386 23 14V14.5"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XMarkSvg() {
  return (
    <svg
      width="1em"
      height="1em"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
    >
      <path
        d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckSvg() {
  return (
    <svg
      width="1em"
      height="1em"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
    >
      <path
        d="M5 13L9 17L19 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check(props: Partial<CustomIconComponentProps>) {
  return (
    <Icon
      component={CheckSvg}
      {...props}
      style={{
        // eslint-disable-next-line react/destructuring-assignment
        fontSize: `${props.size}px`,
      }}
    />
  );
}

export function XMark(props: Partial<CustomIconComponentProps>) {
  return (
    <Icon
      component={XMarkSvg}
      {...props}
      style={{
        // eslint-disable-next-line react/destructuring-assignment
        fontSize: `${props.size}px`,
      }}
    />
  );
}

export function Group(props: Partial<CustomIconComponentProps>) {
  return (
    <Icon
      component={GroupSvg}
      style={{
        fontSize: '20px',
      }}
      {...props}
    />
  );
}
