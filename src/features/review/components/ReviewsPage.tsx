import React, { useState, useEffect, FormEvent } from 'react';
import { Star, Trash2, PlusCircle, Search } from 'lucide-react';
import { createReview, getAllReviews, deleteReview } from '../../../services/reviewService';
import { type ReviewDTO } from '../../../types/review';
import { FormPageLayout } from '../../../components/shared/FormPageLayout';
import { StatusDialogs } from '../../../components/shared/StatusDialogs';
import { FormError } from '../../../components/shared/FormError';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';

export function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [filterEntityId, setFilterEntityId] = useState('');
  const [filterEntityType, setFilterEntityType] = useState('');

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
    creationDate: '',
    adopterId: '',
    entityId: '',
    entityType: '',
  });
  const [touched, setTouched] = useState({
    rating: false,
    comment: false,
    creationDate: false,
    adopterId: false,
    entityId: false,
    entityType: false,
  });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [deleteTarget, setDeleteTarget] = useState<ReviewDTO | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    setFetchError(null);
    try {
      const data = await getAllReviews(
        filterEntityId ? Number(filterEntityId) : undefined,
        filterEntityType || undefined
      );
      setReviews(data);
    } catch (err) {
      console.error('Error loading reviews:', err);
      setFetchError('Error loading reviews. Please try again.');
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleFilterSearch = (e: FormEvent) => {
    e.preventDefault();
    fetchReviews();
  };

  const isRatingValid = formData.rating !== '' && Number(formData.rating) >= 1 && Number(formData.rating) <= 5;
  const isCommentValid = formData.comment.trim().length > 0;
  const isDateValid = formData.creationDate !== '';
  const isAdopterIdValid = formData.adopterId !== '' && Number(formData.adopterId) > 0;
  const isEntityIdValid = formData.entityId !== '' && Number(formData.entityId) > 0;
  const isEntityTypeValid = formData.entityType !== '';

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitCreate = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ rating: true, comment: true, creationDate: true, adopterId: true, entityId: true, entityType: true });

    if (!isRatingValid || !isCommentValid || !isDateValid || !isAdopterIdValid || !isEntityIdValid || !isEntityTypeValid) {
      return;
    }

    setSubmissionStatus('loading');
    try {
      await createReview({
        rating: Number(formData.rating),
        comment: formData.comment.trim(),
        creationDate: formData.creationDate,
        adopterId: Number(formData.adopterId),
        entityId: Number(formData.entityId),
        entityType: formData.entityType,
      });
      setSubmissionStatus('success');
      setShowCreateForm(false);
      setFormData({ rating: '', comment: '', creationDate: '', adopterId: '', entityId: '', entityType: '' });
      setTouched({ rating: false, comment: false, creationDate: false, adopterId: false, entityId: false, entityType: false });
      setSuccessMessage('Review created successfully.');
      setShowSuccessDialog(true);
      fetchReviews();
    } catch (err: any) {
      setSubmissionStatus('error');
      console.error('Failed to create review:', err);
      const message = err?.response?.status === 403 ? 'Only adopters can create reviews.' : err?.response?.data?.message || 'Failed to create review. Please try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  const handleDeleteClick = (review: ReviewDTO) => {
    setDeleteTarget(review);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget?.id) return;
    setDeleteLoading(true);
    try {
      await deleteReview(deleteTarget.id);
      setReviews((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      setShowDeleteDialog(false);
      setDeleteTarget(null);
      setSuccessMessage('Review deleted successfully.');
      setShowSuccessDialog(true);
    } catch (err: any) {
      setShowDeleteDialog(false);
      console.error('Failed to delete review:', err);
      const message = err?.response?.status === 403 ? 'Only administrators can delete reviews.' : 'Failed to delete review. Please try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setDeleteLoading(false);
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {['star-1', 'star-2', 'star-3', 'star-4', 'star-5'].map((starId, index) => (
        <Star
          key={starId}
          className={`w-4 h-4 ${index + 1 <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  return (
    <FormPageLayout
      title="Reviews"
      description="Browse reviews for shelters and veterinarians, or share your own experience."
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowCreateForm((v) => !v)}
          className="flex items-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New Review
        </button>
      </div>

      {showCreateForm && (
        <form
          onSubmit={handleSubmitCreate}
          className="bg-white rounded-lg shadow-sm border border-orange-200 p-8 mb-6"
        >
          <h2 className="text-lg font-medium text-gray-800 mb-6">Create New Review</h2>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="adopterId" className="block text-sm font-medium text-gray-700 mb-2">
                  Adopter ID <span className="text-red-500">*</span>
                </label>
                <input
                  id="adopterId"
                  type="number"
                  min="1"
                  value={formData.adopterId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('adopterId')}
                  placeholder="e.g., 1"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    touched.adopterId && !isAdopterIdValid
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  required
                />
                {touched.adopterId && !isAdopterIdValid && <FormError message="Required" />}
              </div>
              <div>
                <label htmlFor="creationDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Creation Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="creationDate"
                  type="date"
                  value={formData.creationDate}
                  onChange={handleChange}
                  onBlur={() => handleBlur('creationDate')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    touched.creationDate && !isDateValid
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  required
                />
                {touched.creationDate && !isDateValid && <FormError message="Required" />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="entityId" className="block text-sm font-medium text-gray-700 mb-2">
                  Entity ID <span className="text-red-500">*</span>
                </label>
                <input
                  id="entityId"
                  type="number"
                  min="1"
                  value={formData.entityId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('entityId')}
                  placeholder="e.g., 3"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    touched.entityId && !isEntityIdValid
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  required
                />
                {touched.entityId && !isEntityIdValid && <FormError message="Required" />}
              </div>
              <div>
                <label htmlFor="entityType" className="block text-sm font-medium text-gray-700 mb-2">
                  Entity Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="entityType"
                  value={formData.entityType}
                  onChange={handleChange}
                  onBlur={() => handleBlur('entityType')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                    touched.entityType && !isEntityTypeValid
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  required
                >
                  <option value="">Select type</option>
                  <option value="SHELTER">Shelter</option>
                  <option value="VETERINARIAN">Veterinarian</option>
                </select>
                {touched.entityType && !isEntityTypeValid && <FormError message="Required" />}
              </div>
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating (1–5) <span className="text-red-500">*</span>
              </label>
              <select
                id="rating"
                value={formData.rating}
                onChange={handleChange}
                onBlur={() => handleBlur('rating')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                  touched.rating && !isRatingValid
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-orange-500'
                }`}
                required
              >
                <option value="">Select rating</option>
                <option value="1">⭐ 1 — Poor</option>
                <option value="2">⭐⭐ 2 — Fair</option>
                <option value="3">⭐⭐⭐ 3 — Good</option>
                <option value="4">⭐⭐⭐⭐ 4 — Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 — Excellent</option>
              </select>
              {touched.rating && !isRatingValid && <FormError message="Rating is required" />}
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment"
                rows={4}
                value={formData.comment}
                onChange={handleChange}
                onBlur={() => handleBlur('comment')}
                placeholder="Share your experience..."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                  touched.comment && !isCommentValid
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-orange-500'
                }`}
                required
              />
              {touched.comment && !isCommentValid && <FormError message="Comment is required" />}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submissionStatus === 'loading'}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm disabled:opacity-50"
            >
              {submissionStatus === 'loading' ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}

      <form
        onSubmit={handleFilterSearch}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6 flex flex-wrap gap-3 items-end"
      >
        <div>
          <label htmlFor="filterEntityId" className="block text-xs font-medium text-gray-500 mb-1">Entity ID</label>
          <input
            id="filterEntityId"
            type="number"
            min="1"
            value={filterEntityId}
            onChange={(e) => setFilterEntityId(e.target.value)}
            placeholder="All"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm w-28"
          />
        </div>
        <div>
          <label htmlFor="filterEntityType" className="block text-xs font-medium text-gray-500 mb-1">Entity Type</label>
          <select
            id="filterEntityType"
            value={filterEntityType}
            onChange={(e) => setFilterEntityType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white"
          >
            <option value="">All</option>
            <option value="SHELTER">Shelter</option>
            <option value="VETERINARIAN">Veterinarian</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
        >
          <Search className="w-4 h-4" /> Search
        </button>
        {(filterEntityId || filterEntityType) && (
          <button
            type="button"
            onClick={() => { setFilterEntityId(''); setFilterEntityType(''); fetchReviews(); }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            Clear
          </button>
        )}
      </form>

      {loadingReviews && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-gray-500">Loading reviews...</span>
        </div>
      )}

      {fetchError && !loadingReviews && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center gap-3">
          <p className="text-red-700">{fetchError}</p>
        </div>
      )}

      {!loadingReviews && !fetchError && reviews.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No reviews found.</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting the filters or be the first to leave a review.</p>
        </div>
      )}

      {!loadingReviews && !fetchError && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{review.entityType}</span>
                  <span className="text-xs text-gray-400">Entity ID: {review.entityId}</span>
                </div>
                <p className="text-gray-700 break-words mb-3">{review.comment}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Adopter ID: {review.adopterId}</span>
                  <span>{review.creationDate}</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteClick(review)}
                title="Delete review (Admin only)"
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2 text-red-600">
              <Trash2 className="h-12 w-12" />
              <span>Delete Review?</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              You are about to permanently delete this review. This action cannot be undone.
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

      <StatusDialogs
        showSuccess={showSuccessDialog}
        onSuccessClose={() => setShowSuccessDialog(false)}
        successTitle="Done!"
        successDescription={successMessage}
        showError={showErrorDialog}
        onErrorClose={() => setShowErrorDialog(false)}
        errorMessage={errorDialogMessage}
      />
    </FormPageLayout>
  );
}
