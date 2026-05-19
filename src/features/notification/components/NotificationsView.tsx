import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, Trash2, AlertCircle, MailOpen, Mail } from 'lucide-react';
import { getAllNotifications, markNotificationAsRead, deleteNotification } from '../../../services/notificationService';
import { type NotificationDTO } from '../../../types/notification';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';

export function NotificationsView() {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Estado para confirmación de eliminación
  const [deleteTarget, setDeleteTarget] = useState<NotificationDTO | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Dialogs de resultado
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState<string | null>(null);

  // HU16 — Cargar todas las notificaciones al montar
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await getAllNotifications();
      setNotifications(data);
    } catch (err: any) {
      setFetchError('Error loading notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // HU17 — Marcar notificación como leída
  const handleMarkAsRead = async (notification: NotificationDTO) => {
    if (notification.isRead) return;
    try {
      const updated = await markNotificationAsRead(notification.id!);
      setNotifications((prev) =>
        prev.map((n) => (n.id === updated.id ? updated : n))
      );
      setSuccessMessage('Notification marked as read.');
      setShowSuccessDialog(true);
    } catch (err: any) {
      const message =
        err?.response?.status === 403
          ? 'You do not have permission to update this notification.'
          : 'Failed to mark notification as read. Please try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    }
  };

  // HU18 — Confirmar eliminación
  const handleDeleteClick = (notification: NotificationDTO) => {
    setDeleteTarget(notification);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget?.id) return;
    setDeleteLoading(true);
    try {
      await deleteNotification(deleteTarget.id);
      setNotifications((prev) => prev.filter((n) => n.id !== deleteTarget.id));
      setShowDeleteDialog(false);
      setDeleteTarget(null);
      setSuccessMessage('Notification deleted successfully.');
      setShowSuccessDialog(true);
    } catch (err: any) {
      setShowDeleteDialog(false);
      const message =
        err?.response?.status === 403
          ? 'You do not have permission to delete this notification.'
          : 'Failed to delete notification. Please try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Encabezado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-semibold text-gray-900">Notifications</h1>
          </div>
          <p className="text-gray-600">
            View all your received notifications. Mark them as read or remove the
            ones you no longer need.
          </p>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-gray-500">Loading notifications...</span>
          </div>
        )}

        {/* Error de carga */}
        {fetchError && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Error loading notifications</p>
              <p className="text-red-600 text-sm mt-1">{fetchError}</p>
              <button
                onClick={fetchNotifications}
                className="mt-3 text-sm text-orange-600 underline hover:text-orange-700"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* HU16 — Lista de notificaciones vacía */}
        {!loading && !fetchError && notifications.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No notifications yet.</p>
            <p className="text-gray-400 text-sm mt-1">
              You will see your notifications here once they arrive.
            </p>
          </div>
        )}

        {/* HU16 — Lista de notificaciones */}
        {!loading && !fetchError && notifications.length > 0 && (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border p-5 flex items-start justify-between gap-4 transition-all ${
                  notification.isRead
                    ? 'border-gray-200 opacity-70'
                    : 'border-orange-200 border-l-4 border-l-orange-500'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {notification.isRead ? (
                    <MailOpen className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <p className={`text-gray-800 break-words ${!notification.isRead ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-400">{notification.date}</span>
                      {notification.isRead ? (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          Read
                        </span>
                      ) : (
                        <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full font-medium">
                          Unread
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Acciones HU17 y HU18 */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification)}
                      title="Mark as read"
                      className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(notification)}
                    title="Delete notification"
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialog de confirmación de eliminación — HU18 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2 text-red-600">
              <Trash2 className="h-12 w-12" />
              <span>Delete Notification?</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              You are about to delete the notification:
              <br />
              <strong className="text-gray-700 block mt-2 px-2">
                "{deleteTarget?.message}"
              </strong>
              <br />
              This action cannot be undone and the notification will no longer
              appear in your inbox.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => { setShowDeleteDialog(false); setDeleteTarget(null); }}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleteLoading}
              onClick={handleConfirmDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm disabled:opacity-50"
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de éxito */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <span>Done!</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              {successMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
              onClick={() => setShowSuccessDialog(false)}
            >
              Accept
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de error */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2 text-red-600">
              <AlertCircle className="h-12 w-12" />
              <span>Error</span>
            </DialogTitle>
            <DialogDescription className="text-center text-red-500">
              {errorDialogMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
              onClick={() => { setShowErrorDialog(false); setErrorDialogMessage(null); }}
            >
              Accept
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
