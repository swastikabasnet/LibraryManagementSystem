package com.lms.services;

import com.lms.model.User;
import com.lowagie.text.*;
import com.lowagie.text.pdf.CMYKColor;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class PDFGeneratorService {

    private List<User> userList;

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public void generate(HttpServletResponse response) throws DocumentException, IOException {

        // Creating the Object of Document
        Document document = new Document(PageSize.A4);

        // Getting instance of PdfWriter
        PdfWriter.getInstance(document, response.getOutputStream());

        // Opening the created document to modify it
        document.open();

        // Creating font
        // Setting font style and size
        Font fontTiltle = FontFactory.getFont(FontFactory.TIMES_ROMAN);
        fontTiltle.setSize(20);

        // Creating paragraph
        Paragraph paragraph = new Paragraph("List Of Users", fontTiltle);

        // Aligning the paragraph in document
        paragraph.setAlignment(Paragraph.ALIGN_CENTER);

        // Adding the created paragraph in document
        document.add(paragraph);

        // Creating a table of 3 columns
        PdfPTable table = new PdfPTable(5);

        // Setting width of table, its columns and spacing
        table.setWidthPercentage(100f);
        table.setWidths(new int[] { 1, 2, 4, 2, 2 });
        table.setSpacingBefore(5);

        // Create Table Cells for table header
        PdfPCell cell = new PdfPCell();

        // Setting the background color and padding
        float c = 0.783f; // Cyan value
        float m = 0.0f;   // Magenta value
        float y = 0.886f; // Yellow value
        float k = 0.545f; // Black value
        cell.setBackgroundColor(new CMYKColor(c,m,y,k));
        cell.setPadding(5);

        // Creating font
        // Setting font style and size
        Font font = FontFactory.getFont(FontFactory.TIMES_ROMAN);
        font.setColor(CMYKColor.WHITE);

        // Adding headings in the created table cell/ header
        // Adding Cell to table
        cell.setPhrase(new Phrase("ID", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Full name", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Email", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Phone number", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Joined date", font));
        table.addCell(cell);

        // Iterating over the list of user
        for (User user : userList) {
            // Adding user id
            table.addCell(String.valueOf(user.getId()));
            // Adding user name
            table.addCell(user.getName());
            // Adding user email
            table.addCell(user.getEmail());
            // Adding user contact
            table.addCell(String.valueOf(user.getPhoneNumber()));
            // Adding user joined date
            table.addCell(String.valueOf(user.getRegisteredDate()));
        }
        // Adding the created table to document
        document.add(table);

        // Closing the document
        document.close();

    }
}
