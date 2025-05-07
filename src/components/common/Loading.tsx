import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className="size-15 text-slate500"
      />
      <span className="ml-3 text-lg text-slate400">로딩 중...</span>
    </div>
  );
}
