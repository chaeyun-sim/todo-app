import Modal, { ModalProps } from '..';

export default function NotificationModal({
  isOpen,
  onClose,
}: Pick<ModalProps, 'isOpen' | 'onClose'>) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='알림'
      height={'50%'}
    >
      <div style={{ width: '265px' }}>
        {/* 알림 카드 */}
        <div>...</div>
      </div>
    </Modal>
  );
}
