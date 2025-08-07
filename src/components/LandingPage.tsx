import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/schemas/contactForm";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  TrendingUp, 
  BarChart3, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  Users, 
  GraduationCap, 
  RefreshCw, 
  Cog,
  Star,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import heroImage from "@/assets/hero-metalurgia.jpg";

const LandingPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      cargo: "",
      empleados: "",
      mensaje: "",
    },
  });

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, "");
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Sanitize inputs
      const sanitizedData = {
        nombre: sanitizeInput(data.nombre),
        email: sanitizeInput(data.email),
        telefono: sanitizeInput(data.telefono),
        empresa: sanitizeInput(data.empresa),
        cargo: data.cargo ? sanitizeInput(data.cargo) : "",
        empleados: data.empleados ? sanitizeInput(data.empleados) : "",
        mensaje: data.mensaje ? sanitizeInput(data.mensaje) : "",
      };

      // Send email via Supabase edge function
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: sanitizedData
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: "¡Formulario enviado!",
        description: "Te hemos enviado un email de confirmación. Nos pondremos en contacto contigo pronto.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al enviar el formulario. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-white">LexAs</h3>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                LexPro ERP
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                La Solución Integral para Maximizar la Eficiencia de tu Metalúrgica
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Control total, desde el taller hasta la contabilidad. ¡Más rentabilidad en cada proceso!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Solicita una Demostración Gratuita Hoy
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                Quiero una Asesoría Personalizada
              </Button>
            </div>
            
            <p className="text-white/80 text-sm">
              Miles de empresas ya confían en LexPro ERP
            </p>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Desafía la Complejidad. Abraza la Eficiencia.
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              El sector metalúrgico y de maestranzas tiene desafíos únicos. LexPro ERP fue diseñado 
              específicamente para superarlos, ofreciéndote una plataforma robusta que centraliza tu 
              operación, reduce costos y potencia tu crecimiento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 shadow-card hover:shadow-professional transition-shadow">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Máxima Productividad</h4>
                <p className="text-muted-foreground">
                  Automatiza tareas, optimiza flujos de trabajo y eleva la eficiencia de tu planta.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-card hover:shadow-professional transition-shadow">
              <CardContent className="p-0">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Reducción de Costos Operacionales</h4>
                <p className="text-muted-foreground">
                  Controla inventarios, minimiza mermas y toma decisiones financieras inteligentes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-card hover:shadow-professional transition-shadow">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Escalabilidad Garantizada</h4>
                <p className="text-muted-foreground">
                  Crece sin límites. LexPro se adapta al tamaño y complejidad de tu negocio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Funcionalidades Clave */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">
              LexPro: El Sistema de Producción que tu Negocio Necesita
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Cog className="w-6 h-6 text-primary mr-3" />
                  <h4 className="text-xl font-semibold">Gestión Integral de la Producción</h4>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Planificación de la producción optimizada</li>
                  <li>• Control de órdenes de trabajo en tiempo real</li>
                  <li>• Integración con maquinaria industrial</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Package className="w-6 h-6 text-secondary mr-3" />
                  <h4 className="text-xl font-semibold">Inventario y Almacenes Inteligentes</h4>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Gestión precisa de stock y materias primas</li>
                  <li>• Control de lotes y trazabilidad completa</li>
                  <li>• Optimización de la logística interna</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-primary mr-3" />
                  <h4 className="text-xl font-semibold">Comercialización y Ventas</h4>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Gestión de cotizaciones y pedidos</li>
                  <li>• Análisis de ventas y pronósticos</li>
                  <li>• CRM integrado para clientes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-secondary mr-3" />
                  <h4 className="text-xl font-semibold">Adquisiciones y Proveedores</h4>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Gestión de compras eficientes</li>
                  <li>• Control de calidad de insumos</li>
                  <li>• Gestión de relaciones con proveedores</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-primary mr-3" />
                  <h4 className="text-xl font-semibold">Facturación Electrónica y Contabilidad</h4>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Cumplimiento normativo y fiscal</li>
                  <li>• Reportes financieros en tiempo real</li>
                  <li>• Visión completa de la salud financiera</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-secondary mr-3" />
                  <h4 className="text-xl font-semibold">Calidad y Trazabilidad</h4>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Control de calidad en cada etapa</li>
                  <li>• Gestión de no conformidades</li>
                  <li>• Trazabilidad completa de productos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">
              ¿Qué dicen nuestros clientes sobre LexPro?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 shadow-card">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">
                  "Desde que implementamos LexPro, nuestra eficiencia en planta aumentó un 35% y 
                  hemos reducido los errores en inventario en un 60%. ¡Es indispensable para nosotros!"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold">Carlos Mendoza</p>
                  <p className="text-muted-foreground">Gerente de Producción, Metalúrgica Industrial S.A.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 shadow-card">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">
                  "La personalización y el soporte de LexPro fueron clave para nuestra transición. 
                  Ahora tenemos una visión completa y tomamos decisiones mucho más rápido."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold">Ana Rodríguez</p>
                  <p className="text-muted-foreground">Directora Operaciones, Maestranza del Norte</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beneficios Adicionales */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Más que un ERP: Tu Socio Estratégico
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-3">Soporte Dedicado</h4>
              <p className="text-muted-foreground">
                Nuestro equipo de expertos te acompaña en cada etapa, desde la implementación hasta el uso diario.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="text-lg font-semibold mb-3">Capacitación Personalizada</h4>
              <p className="text-muted-foreground">
                Aseguramos que tu equipo domine LexPro con programas de formación a la medida.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-3">Actualizaciones Constantes</h4>
              <p className="text-muted-foreground">
                Nos mantenemos a la vanguardia para que tu negocio nunca se detenga.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cog className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="text-lg font-semibold mb-3">Personalización Total</h4>
              <p className="text-muted-foreground">
                LexPro se adapta a tus procesos, no al revés. Un sistema hecho a la medida de tus necesidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA y Formulario */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">
                ¿Listo para Transformar tu Operación?
              </h2>
              <p className="text-xl text-white/90">
                No dejes que la complejidad frene tu crecimiento. Descubre cómo LexPro ERP 
                puede llevar tu metalúrgica o maestranza al siguiente nivel.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre Completo *</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Corporativo *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="tu@empresa.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="telefono"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono *</FormLabel>
                            <FormControl>
                              <Input placeholder="+56 9 1234 5678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="empresa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre de la Empresa *</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu empresa" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cargo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cargo</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu cargo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="empleados"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número de Empleados</FormLabel>
                            <FormControl>
                              <Input placeholder="ej: 50-100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="mensaje"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje (Opcional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Cuéntanos sobre tus necesidades específicas" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-secondary hover:bg-secondary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Solicitar Demostración Gratuita"}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      Tus datos están seguros con nosotros. No compartimos tu información.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Teléfono</h4>
              <p className="text-muted-foreground">+56 2 2673 5885</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-muted-foreground">comunicaciones@lexasconsultores.cl</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Dirección</h4>
              <p className="text-muted-foreground">Teatinos 251, Santiago, Chile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">LexAs</h3>
              <p className="text-white/80">© 2024 LexAs. Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/80 hover:text-white">Política de Privacidad</a>
              <a href="#" className="text-white/80 hover:text-white">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;