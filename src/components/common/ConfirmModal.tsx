import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortal } from 'react-dom';
import Button from './button/Button';

interface Props {
  title: string;
  description: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * 취소 시 나타나는 confirm 모달
 * @param title 제목
 * @param description 설명
 * @param confirmText 확인 버튼 텍스트
 * @param onCancel 취소 버튼 클릭 시 실행할 함수
 * @param onConfirm 확인 버튼 클릭 시 실행할 함수
 */
export default function ConfirmModal({
  title,
  description,
  confirmText,
  onCancel,
  onConfirm,
}: Props) {
  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="flex w-[300px] flex-col gap-6 rounded-lg bg-gs00 p-6 md:w-[450px]">
        <div className="flex w-full flex-col items-center justify-center gap-1">
          <div className="px-4 py-2">
            <div className="flex size-16 items-center justify-center rounded-full bg-gray-400">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-3xl text-gs00"
              />
            </div>
          </div>
          <span className="text-18M">{title}</span>
          <span className="whitespace-pre-line text-center text-14M text-gs400">
            {description}
          </span>
        </div>
        <div className="flex w-full flex-row gap-2">
          <Button
            size="full"
            onClick={onCancel}
            className="bg-gs100 py-4 text-gs600 hover:bg-gs100 focus:bg-gs100 active:bg-gs100"
          >
            취소
          </Button>
          <Button
            size="full"
            onClick={onConfirm}
            className="bg-warn500 py-5 text-gs00 hover:bg-warn500 focus:bg-warn500 active:bg-warn500"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
