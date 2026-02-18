import { PageTransition } from "@/components/PageTransition";
import { Shield, Lock, CreditCard, Info, FileText } from "lucide-react";

export default function Privacy() {
  return (
    <PageTransition>
      <div className="container-padding py-16 lg:py-24">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are committed to protecting your privacy and ensuring transparency in how we handle your data and payments.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {/* Privacy Policy Block */}
          <div className="prose prose-stone prose-lg dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <div className="bg-card border border-border/50 rounded-2xl p-8 mb-12 shadow-sm">
              <p className="lead mt-0">
                Design Brew is fully committed to protecting the privacy of anyone using the site and the confidentiality of any information that you provide us with.
              </p>
              <p className="text-sm text-muted-foreground mb-0">
                This Privacy Policy demonstrates our commitment to protecting visitors' privacy and sets forth the website’s information and management practices.
              </p>
            </div>

            <SectionHeader icon={<Lock />} title="Data Security & Storage" />
            <p>
              Information that we gather from you is stored securely on our web servers in a secure database. We will not sell, distribute, or lease your personal information to third parties (apart from your address to our courier companies for delivery purposes only).
            </p>

            <SectionHeader icon={<CreditCard />} title="Payment Security" />
            <p>
              We do not store our customers’ credit card details on our servers. Payments are processed with the highest security standards in place, directly by accredited 3rd Party specialist payment gateways – <strong>PayPal</strong> or <strong>CCAvenue</strong>, using SSL encryption.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-12 mb-4">Personal Information Collected</h3>
            <p>
              We will only collect personal information from users if they voluntarily submit the necessary details to us. To make use of certain features on our platforms, you willingly provide us with information such as:
            </p>
            
            {/* Condensed Tag Cloud Style */}
            <div className="flex flex-wrap gap-2 my-6 not-prose">
              {['Name', 'Phone Number', 'Email Address', 'Gender', 'Age', 'Interests', 'Occupation'].map((item) => (
                <span key={item} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground border border-border hover:border-primary/50 transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              This information helps us enhance our services to cater to your individual interests. Further, this information is needed to create and maintain your accounts with us and to contact you whenever required.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-12 mb-4">Automatic & Third-Party Data</h3>
            <p>
              We collect information about your interactions, devices (mobile, tablet), and browsing activities (pages viewed, time spent). If you register via social media (Facebook, Instagram, YouTube), we may retrieve public details like your name and friend list to provide services.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-12 mb-4">How We Use Information</h3>
            <ul className="space-y-2">
              <li>Show the most relevant content based on your requirements.</li>
              <li>Respond to your questions and suggest competitors with similar interests.</li>
              <li>Analyse our audience to improve services.</li>
              <li>Notify users about modifications in terms of service.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-12 mb-4">Cookie Policy</h3>
            <div className="flex items-start gap-4 bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/20">
              <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <div className="text-sm">
                <p className="mt-0 font-medium text-blue-900 dark:text-blue-100">
                  Cookie Usage
                </p>
                <p className="mb-0 text-blue-800/80 dark:text-blue-200/70">
                  Our website uses cookies to improve user experience, but we do not exchange cookies with external data suppliers. By using our site, you intend to accept this policy.
                </p>
              </div>
            </div>
          </div>

          {/* Refund Policy Section */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-red-50/50 to-transparent dark:from-red-900/10 pointer-events-none rounded-3xl" />
            
            <div className="relative border border-red-100 dark:border-red-900/30 rounded-3xl p-8 md:p-10 bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground m-0">
                  Refund Policy
                </h2>
              </div>

              <div className="prose prose-stone dark:prose-invert max-w-none text-sm md:text-base">
                <p>
                  In line with providing our clients with the best quality work and user experience, we have developed a considerate cancellation and refund policy. Every project begins with a complete analysis and creation of a <strong>scope of work document</strong> to ensure mutual understanding.
                </p>
                
                <div className="my-6 pl-4 border-l-4 border-red-200 dark:border-red-800 italic text-muted-foreground">
                  "With every milestone, there lies a time which is spent to achieve it. So, a refund is not possible for any work which is being commenced or completed."
                </div>

                <p>
                  <strong>Strict Non-Refundable Scenarios:</strong>
                </p>
                <ul className="mt-2 space-y-1">
                  <li>Once the client approves mock-up designs and development begins.</li>
                  <li>Mid-way through projects (no partial refunds).</li>
                  <li>If a transaction has already been executed.</li>
                </ul>

                <p className="mt-6 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                  Policy Summary
                </p>
                <p className="mt-2">
                  In case a project gets terminated on a mutual basis, the client has control of all work completed up to that point, and any payment for further development will automatically become void. <strong>Therefore, no refunds will be entertained.</strong> Please contact us for further queries.
                </p>
              </div>
            </div>
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