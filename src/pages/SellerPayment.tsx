
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SellerPayment = () => {
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const listingFee = 50;
  const instaPayNumber = "01234567890";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentProof) {
      alert('Please upload payment confirmation before submitting');
      return;
    }
    
    setSubmitted(true);
    alert('Payment confirmation submitted successfully! Admin will review and approve your listing.');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          
          {!submitted ? (
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-emerald-600 mb-4">Listing Payment</CardTitle>
                <p className="text-gray-600">Complete your payment to list your product</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Listing Fee */}
                <div className="bg-emerald-50 p-6 rounded-lg text-center">
                  <CreditCard className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-emerald-600 mb-2">Listing Fee</h2>
                  <p className="text-4xl font-bold text-gray-800">{listingFee} EGP</p>
                  <p className="text-gray-600 mt-2">One-time fee per product listing</p>
                </div>

                {/* Payment Instructions */}
                <Card className="border border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-600">Payment Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">InstaPay Transfer</h3>
                      <p className="text-blue-700">Send {listingFee} EGP to this InstaPay number:</p>
                      <p className="text-2xl font-bold text-blue-800 font-mono">{instaPayNumber}</p>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>1. Open your mobile banking app</p>
                      <p>2. Select InstaPay transfer</p>
                      <p>3. Enter the number above</p>
                      <p>4. Send exactly {listingFee} EGP</p>
                      <p>5. Take a screenshot of the confirmation</p>
                      <p>6. Upload the screenshot below</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Upload Payment Proof */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Upload Payment Confirmation</Label>
                    <div className="border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="payment-proof"
                        required
                      />
                      <label htmlFor="payment-proof" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                        {paymentProof ? (
                          <div>
                            <p className="text-emerald-600 font-semibold">{paymentProof.name}</p>
                            <p className="text-sm text-gray-500">Click to change file</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-600">Click to upload payment screenshot</p>
                            <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg py-3 text-lg"
                  >
                    Submit Payment Confirmation
                  </Button>
                </form>

                <div className="text-center text-sm text-gray-500">
                  <p>After submission, admin will verify your payment and approve your listing within 24 hours.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Your payment confirmation has been sent to the admin team for verification.
                  You will receive a notification once your product is approved and live on the platform.
                </p>
                <div className="space-y-4">
                  <Link to="/seller">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white mr-4">
                      Back to Dashboard
                    </Button>
                  </Link>
                  <Link to="/seller/add-product">
                    <Button variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                      Add Another Product
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default SellerPayment;