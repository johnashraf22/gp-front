import { useState, useEffect } from 'react';
import { Search, Check, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { productApi, Product } from '@/lib/api';

// Define a type for payment requests
interface PaymentRequest {
  id: number;
  seller: string;
  product: string;
  amount: string;
  date: string;
  proof: string;
  category: string;
  description: string;
  price: string;
  images: string[];
}

// Discriminated union for selectedRequest
type SelectedRequest = { type: 'product', data: Product } | { type: 'payment', data: PaymentRequest };

const AdminRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showReasonInput, setShowReasonInput] = useState<number | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<SelectedRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [currentRejectId, setCurrentRejectId] = useState<number | null>(null);
  const [currentRejectType, setCurrentRejectType] = useState<string>('');
  const [sellerRequests, setSellerRequests] = useState<Product[]>([]);

  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([
    {
      id: 1,
      seller: 'Ahmed Mohamed',
      product: 'The Great Gatsby',
      amount: '50 EGP',
      date: '2024-01-15',
      proof: 'payment-proof-1.jpg',
      category: 'books',
      description: 'Classic American novel in excellent condition',
      price: '45 EGP',
      images: ['pay1.jpg', 'pay2.jpg']
    },
    {
      id: 2,
      seller: 'Sara Ali',
      product: 'Summer Dress',
      amount: '50 EGP',
      date: '2024-01-14',
      proof: 'payment-proof-2.jpg',
      category: 'clothes',
      description: 'Beautiful summer dress, size M',
      price: '95 EGP',
      images: ['pay3.jpg', 'pay4.jpg']
    },
  ]);

  // Fetch not approved products on mount
  useEffect(() => {
    const fetchNotApproved = async () => {
      try {
        const products = await productApi.getNotApprovedProducts();
        setSellerRequests(products);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchNotApproved();
  }, []);

  const sendApprovalEmail = (email: string, type: string) => {
    const message =
      type === 'seller'
        ? 'Your request has been approved. Please proceed to pay the fee.'
        : 'Your payment has been approved. Product listing is now active.';
    alert(`Email sent to ${email}: ${message}`);
  };

  const sendRejectionEmail = (email: string, reason: string) => {
    const message = `Your request has been rejected. Reason: ${reason}`;
    alert(`Rejection email sent to ${email}: ${message}`);
  };

  const handleAccept = (id: number, type: string) => {
    if (type === 'Seller') {
      const request = sellerRequests.find((r) => r.id === id);
      if (request) {
        sendApprovalEmail('seller@example.com', 'seller');
        setSellerRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } else if (type === 'Payment') {
      const request = paymentRequests.find((r) => r.id === id);
      if (request) {
        sendApprovalEmail('seller@example.com', 'payment');
        setPaymentRequests((prev) => prev.filter((r) => r.id !== id));
      }
    }
  };

  const handleRejectClick = (id: number, type: string) => {
    setCurrentRejectId(id);
    setCurrentRejectType(type);
    setShowRejectionModal(true);
  };

  const handleRejectConfirm = () => {
    if (rejectionReason.trim()) {
      if (currentRejectType === 'Seller') {
        const request = sellerRequests.find((r) => r.id === currentRejectId);
        if (request) {
          sendRejectionEmail('seller@example.com', rejectionReason);
          setSellerRequests((prev) => prev.filter((r) => r.id !== currentRejectId));
        }
      } else if (currentRejectType === 'Payment') {
        const request = paymentRequests.find((r) => r.id === currentRejectId);
        if (request) {
          sendRejectionEmail('seller@example.com', rejectionReason);
          setPaymentRequests((prev) => prev.filter((r) => r.id !== currentRejectId));
        }
      }
      setRejectionReason('');
      setShowRejectionModal(false);
    } else {
      alert('Please provide a reason for rejection');
    }
  };

  const handleViewDetails = (request: Product | PaymentRequest, type: string) => {
    if (type === 'Seller') {
      setSelectedRequest({ type: 'product', data: request as Product });
    } else {
      setSelectedRequest({ type: 'payment', data: request as PaymentRequest });
    }
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Seller Requests</h1>
            <p className="text-lg text-gray-600">Review and manage seller applications</p>
          </div>
        </div>
      </section>

      {/* Request Sections */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Seller Registration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-600 text-2xl">Seller Registration Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sellerRequests.map((request) => (
              <div key={request.id} className="flex justify-between items-center border p-4 rounded-lg">
                <div>
                  <p className="font-semibold">{request.name}</p>
                  <p>Type: {request.type}</p>
                  <p>Price: {request.price} EGP</p>
                  {/* Add more product details as needed */}
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleViewDetails(request, 'Seller')} variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => handleAccept(request.id, 'Seller')} className="bg-emerald-600 text-white">
                    <Check className="w-4 h-4 mr-1" /> Accept
                  </Button>
                  <Button 
                    onClick={() => handleRejectClick(request.id, 'Seller')} 
                    variant="outline" 
                    className="text-red-600"
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Confirmation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-600 text-2xl">Payment Confirmation Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentRequests.map((request) => (
              <div key={request.id} className="flex justify-between items-center border p-4 rounded-lg">
                <div>
                  <p className="font-semibold">{request.seller}</p>
                  <p>{request.product} - {request.amount}</p>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleViewDetails(request, 'Payment')} variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => handleAccept(request.id, 'Payment')} className="bg-emerald-600 text-white">
                    Approve Listing
                  </Button>
                  <Button 
                    onClick={() => handleRejectClick(request.id, 'Payment')} 
                    variant="outline" 
                    className="text-red-600"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Modal for Details */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-white w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedRequest.type === 'product' ? (
                <>
                  <div><strong>Name:</strong> {selectedRequest.data.name}</div>
                  <div><strong>Type:</strong> {selectedRequest.data.type}</div>
                  <div><strong>Price:</strong> {selectedRequest.data.price} EGP</div>
                  {/* Add more fields as needed */}
                </>
              ) : (
                <>
                  <div><strong>Seller:</strong> {selectedRequest.data.seller}</div>
                  <div><strong>Product:</strong> {selectedRequest.data.product}</div>
                  <div><strong>Category:</strong> {selectedRequest.data.category}</div>
                  <div><strong>Description:</strong> {selectedRequest.data.description}</div>
                  <div><strong>Price:</strong> {selectedRequest.data.price}</div>
                  <div><strong>Amount:</strong> {selectedRequest.data.amount}</div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedRequest.data.images.map((img: string, index: number) => (
                      <img src={img} alt="proof" key={index} className="w-full rounded shadow" />
                    ))}
                  </div>
                </>
              )}
              <Button onClick={() => setShowDetailsModal(false)} variant="outline" className="mt-4">Close</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-white w-full max-w-md p-6">
            <CardHeader>
              <CardTitle className="text-xl">Rejection Reason</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-1">
                  Please provide a reason for rejection:
                </label>
                <Input
                  id="rejectionReason"
                  type="text"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="w-full"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                }} variant="outline">
                  Cancel
                </Button>
                <Button 
                  onClick={handleRejectConfirm}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Confirm Rejection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;