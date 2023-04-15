<%@ Page Language="C#" %>
    <script language="C#" runat="Server">
        void Page_Load(object sender, EventArgs e)
        {
            lblMessage.Text = "Hello 2204671";
            lblServerIP.Text = "Server IP is " + System.Net.Dns.GetHostByName(System.Net.Dns.GetHostName()).AddressList[0].ToString();
            lblClientIP.Text = "Client IP is " + HttpContext.Current.Request.UserHostAddress;
            lblType.Text = "Authentication: " + User.Identity.AuthenticationType;
            lblUser.Text = "Logged on as: " + User.Identity.Name;
            lblScheme.Text = "Using protocol: " + Page.Request.Url.Scheme;
        }
    </script>
    <html>

    <head>
        <title>First ASP.NET page written in Notepad</title>
    </head>

    <body>
        <asp:Label ID="lblMessage" runat="Server" />
        <br />
        <asp:Label ID="lblServerIP" runat="Server" />
        <br />
        <asp:Label ID="lblClientIP" runat="Server" />
        <br />
        <asp:Label ID="lblType" runat="Server" />
        <br />
        <asp:Label ID="lblUser" runat="Server" />
        <br />
        <asp:Label ID="lblScheme" runat="Server" />
    </body>

    </html>