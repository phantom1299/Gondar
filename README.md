# Gondar v1.3

# Nedir, neyin nesidir
Gondar, React-Native ve MongoDB kullanılarak geliştirilen bir Mobil Uygulamadır.
Bu uygulama ile freelance çalışan ve iş vereni, bir mobil uygulama çatısı altında toplamayı hedefliyoruz.

Uygulama 3 bileşenden oluşuyor;
  Freelance iş yapan kişiler / social media influencer
  İşi veren yönetici/yöneticiler
  İşlerin kendisi

# Admin bölümü
Web tabanlı admin bölümünde ihtiyaç duyulan araçlar:
  1.  Yeni bir freelance yazar / social media influencer ekleyebilmek. 
  2.  Email ve parola bilgilerini oluşturup, kullanıcının e-posta adresine otomatik olarak gönderilmesini sağlamak.
  3.  Infleuncer ya da freelancer yazara ait kategorik tagler oluşturmak ve daha sonra bunları filtreleyebilmek. Örnek tagler:
      #infleuncer #instagram #youtuber #webdeveloper #photographer. Bu sayede yönetici kendi oluşturduğu filtreler sayesinde işi bir
      fırsat olarak dilediği kadar kullanıcıya push notification olarak gönderebilecek. Örneğin, filanca otelde fotoğraf çekim işi var,
      bütçesi 500 TL…  Portföyde bulunan 5 fotoğrafçıya bu iş ilanı push notification olarak gönderilecek. Daha sonra birisi işi aldım
      diyecek. Yönetici bunu onayladığı anda iş için bir deadline başlayacak.

Kullanıcıdan beklediğimiz bilgileri:
Ad- soyad – telefon – sosyal medya hesapları – tc kimlik no – adres (fatura işlemleri için)

# İş yönetimi

Yeni bir iş geldiğinde bunu ilgili kullanıcılara yönlendirebilme… burada taglere göre filtreleme önemli. Örneğin bir youtube video işi geldiğinde bunu herkese göndermek istemiyoruz, yalnızca ilgili kullanıcılara gönderelim.
Gelen cevapları görebilme (kabul ettim, red, cevap bekleniyor, benimle iletişime geçin)
Tamamlanan işleri görebilme
Kullanıcıların bu işlerden ne kadar kazanç bakiyelerinin olduğunu görebilme

# İş veren
Bu kısmı şimdilik yalnızca kurum içerisinde kalacak şekilde birkaç yönetici olacak. Ancak zaman içerisinde ajanslara ya da kayıtlı iş verenlere yönetim panelinde “ajans” olarak kullanıcı açılabilecek. Dolayısıyla ajanslar işleri sisteme kendileri kaydettirebilirler. Bu çok sonradan eklenecek bir modül. Ancak altyapı hazırlanırken buna uygun bir veri tabanı ya da mantık düşünülebilir.

# Kullanıcı bölümü

Kullanıcılar siteyi değil tercihen mobil uygulamayı kullanacaklar. Görmelerini istediğimiz çok çok kısıtlı bir alan var.

İş teklifleri: Burada kendilerine yönlendirilmiş olan iş tekliflerini görecekler. Kısaca şu bölümler olacak:
  İşin ismi
  Açıklama
  Bütçesi
  Deadline
  Dosya – Attachment

Kullanıcı kendisine gelmiş bu iş teklifini gördüğünde, altta üç seçenek bulunacak:
  KABUL
  RET
  İLETİŞİM

Kullanıcı işi kabul ettikten sonra dönüp tekrar işin ayrıntılarına bakabilmeli. İşi tamamladığında ise bir mesaj atarak işin tamamlandığını ve teslim edildiğini bildirmeli. Ardından onay için bekleyecek. Admin onayladığında artık bakiyesini görebilecek.
