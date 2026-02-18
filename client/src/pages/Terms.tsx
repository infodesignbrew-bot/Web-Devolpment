import { PageTransition } from "@/components/PageTransition";
import { 
  Scale, 
  FileText, 
  Globe, 
  AlertCircle, 
  CreditCard, 
  Link as LinkIcon, 
  ShieldCheck, 
  Key 
} from "lucide-react";

export default function Terms() {
  return (
    <PageTransition>
      <div className="container-padding py-16 lg:py-24">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services. By accessing our website, you agree to be bound by these conditions.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-stone prose-lg dark:prose-invert max-w-none">
            
            {/* Introduction Card */}
            <div className="bg-card border border-border/50 rounded-2xl p-8 mb-12 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <FileText size={100} />
              </div>
              <p className="lead mt-0 font-medium text-foreground">
                DESIGN BREW was established as a web design and development company. We collaborate with companies to transform their concepts into successful brands by leveraging technology, strategy, and creativity, providing digital marketing services from Amritsar.
              </p>
              <p className="text-sm text-muted-foreground mb-0 relative z-10">
                The use of any feature or service available on the website will be subject to the terms and conditions specified below. Whenever you use any service or download any content from our official portal, you agree to adhere to all the terms and conditions.
              </p>
            </div>

            <SectionHeader icon={<Key />} title="Limited License" />
            <p>
              Design Brew offers a non-transferable and restricted right to the users to access its official website. All these rights are subject to the terms and conditions defined. By agreeing to the terms and conditions, you agree not to harm the website in any manner.
            </p>

            <SectionHeader icon={<Globe />} title="Third-Party Content" />
            <p>
              The website of Design Brew contains information that has been taken as a reference. We hereby highlight that any information or content taken from third parties is only for general information purposes. Design Brew does not promote/endorse any third-party content from its official website.
            </p>

            <SectionHeader icon={<AlertCircle />} title="Disclaimer" />
            <div className="pl-4 border-l-4 border-yellow-400/50 italic text-muted-foreground my-4">
              We always focus on keeping our website updated. This website might contain some bugs, errors, or inaccuracies. We do not provide any kind of warranty of the efficiency or accuracy of the website.
            </div>
            <p>
              Any evident or reported inaccuracies on the website may be removed or corrected by Design Brew. Additionally, we reserve the right to change or restrict users’ access to certain website material, such as products, costs, services, and more.
            </p>

            <SectionHeader icon={<CreditCard />} title="Payment and Charges" />
            <p>
              The charges for the services availed by the clients are expected and should be payable in advance of the provision of the service. Payments can be made in any lawful mode.
            </p>

            <SectionHeader icon={<LinkIcon />} title="Reservation of Rights & Links" />
            <p>
              We have the right to ask you to take down any link or all links to our website. You will have to agree to remove any links to our website. Additionally, we can change these terms at any moment, as well as the linking policy.
            </p>
            <p>
              <strong>Removal of links:</strong> You are free to contact us at any time and let us know if you discover any links on our website that are offensive for any particular reason. Requests for links to be removed will be taken into account, but we are not required to do so or to reply to you directly.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              We do not guarantee the accuracy, completeness, or timeliness of the information on this website, and we do not guarantee that it will stay accessible.
            </p>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mt-12 mb-4">
      <div className="text-primary/80">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground m-0">
        {title}
      </h3>
    </div>
  );
}