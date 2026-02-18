'use client';

import { toast } from 'sonner';

export default function ContactForm() {
  const handleSubmit = () => {
    
    toast('Mesajınız gönderildi!');

    toast.success('İşlem başarıyla tamamlandı');
    toast.error('Bir hata oluştu, lütfen tekrar deneyin');
    
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.promise(promise, {
      loading: 'Yükleniyor...',
      success: 'Veriler güncellendi!',
      error: 'Hata oluştu',
    });
  };

  return (
    <button onClick={handleSubmit}>
      Bildirimi Tetikle
    </button>
  );
}